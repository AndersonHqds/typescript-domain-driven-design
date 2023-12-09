import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe('Order service unit tests', () => {
  it('should place an order', () => {
    const customer = new Customer("1", "Goku");
    const orderItem = new OrderItem("1", "Item 1", 100, "1", 2);

    const order = OrderService.placeOrder(customer, [orderItem]);
    
    expect(customer.rewardPoints).toBe(100);
    expect(order.total()).toBe(200);
  });

  it("should get total of all orders", () => {
    const orderItem = new OrderItem("1", "Item 1", 100, "1", 2);
    const orderItem2 = new OrderItem("2", "Item 2", 200, "2", 2);

    const order = new Order("1", "123", [orderItem]);
    const order2 = new Order("2", "123", [orderItem2]);

    const total = OrderService.total([order, order2]);

    expect(total).toBe(600);
  });
});