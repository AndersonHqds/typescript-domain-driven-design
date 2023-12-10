import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total(),
      items: entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
      })),
    }, {
      include: [{ model: OrderItemModel }],
    });
  }
  async update(entity: Order): Promise<void> {
    await OrderModel.update({
      customer_id: entity.customerId,
      total: entity.total(),
      items: [...entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
      }))],
    }, {  
      where: { id: entity.id },
    });

    const existingItems = await OrderItemModel.findAll({
      where: { order_id: entity.id },
    });

    for (const item of entity.items) {
      const existingItem = existingItems.find((i) => i.id === item.id);
      if (!existingItem) {
        await OrderItemModel.create({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
          order_id: entity.id,
        });
      }
      else {
        await OrderItemModel.update({
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        }, {
          where: { id: item.id },
        });
      }
    }

    const newItemsIds = entity.items.map(item => item.id);
    for (const existingItem of existingItems) {
      if (!newItemsIds.includes(existingItem.id)) {
        await existingItem.destroy();
      }
    }
  }
  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
        include: ["items"],
      });
    } catch (error) {
      throw new Error("Order not found");
    }
    const orderItems = orderModel.items.map(item => {
      return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
    });

    return new Order(orderModel.id, orderModel.customer_id, orderItems);
  }
  async findAll(): Promise<Order[]> {
    const orders = [];
    const ordersFromDb = await OrderModel.findAll({
      include: ["items"],
    });

    for (const orderFromDb of ordersFromDb) {
      const orderItems = orderFromDb.items.map(item => {
        return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
      });
      const order = new Order(orderFromDb.id, orderFromDb.customer_id, orderItems);
      orders.push(order);
    }
    return orders;
  }
}