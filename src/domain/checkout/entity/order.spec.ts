import Order from "./order";
import OrderItem from "./order_item";

describe('Order unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new Order("", "123", [])
    }).toThrow("Id is required");
  });

  it('should throw error when customerId is empty', () => {
    expect(() => {
      new Order("123", "", [])
    }).toThrow("customerId is required");
  });

  it('should throw error when items is empty', () => {
    expect(() => {
      new Order("123", "123", [])
    }).toThrow("Items are required");
  });

  it('should calculate total', () => {
    const item = new OrderItem("1", "Item 1", 100, "1", 2);
    const order = new Order("1", "123", [item]);
    expect(order.total()).toBe(200);

    const item2 = new OrderItem("2", "Item 2", 200, "2", 2);
    const order2 = new Order("2", "123", [item, item2]);
    expect(order2.total()).toBe(600);
  });

  it('should throw error if the item qtd is lower or equal 0', () => {
    expect(() => {
      const item = new OrderItem("1", "Item 1", 100, "1", 0);
      new Order("1", "123", [item]);
    }).toThrow("Quantity must be greater than 0");
  })
});