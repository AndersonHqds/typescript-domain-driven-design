import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

const address = new Address("Street 1", 1, "Zip", "City");
const customer = new Customer("123", "John");
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10, "1", 2);
const item2 = new OrderItem("2", "Item 2", 20, "2", 2);

const order = new Order("1", "123", [item1, item2]);