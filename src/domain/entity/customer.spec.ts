import EnviaConsoleLog1Handler from "../event/customer/handlers/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "../event/customer/handlers/envia-console-log-2.handler";
import EnviaConsoleLogHandler from "../event/customer/handlers/envia-console-log.handler";
import Address from "./address";
import Customer from "./customer";

jest.mock('../event/customer/handlers/envia-console-log-1.handler');
jest.mock('../event/customer/handlers/envia-console-log-2.handler');
jest.mock("../event/customer/handlers/envia-console-log.handler")

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new Customer("", "John")
    }).toThrow("id is required");
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      new Customer("123", "")
    }).toThrow("Name is required");
  });

  it('should change name', () => {
    const customer = new Customer("123", "John");
    customer.changeName("Jane");
    expect(customer.name).toBe("Jane"); 
  });

  it('should activate customer', () => {
    const customer = new Customer("123", "John");
    const address = new Address("Street 1", 1, "Zip", "City");
    customer.address = address;
    expect(customer.isActive()).toBe(false);
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it('should deactivate customer', () => {
    const customer = new Customer("123", "John");
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it('should throw error when address is undefined when you activate a customer', () => {
    
    expect(() => {
      const customer = new Customer("123", "John");
      customer.activate()
    }).toThrow("Address is mandatory to activate a customer");
  });

  it('should add reward points', () => {
    const customer = new Customer("123", "John");
    expect(customer.rewardPoints).toBe(0);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });

  it("should call the notify when a Customer is created", () => {
    new Customer("123", "John");
    expect((EnviaConsoleLog1Handler as jest.Mock).mock.instances[0].handle).toHaveBeenCalled();
    expect((EnviaConsoleLog2Handler as jest.Mock).mock.instances[0].handle).toHaveBeenCalled();
  });

  it("should call the notify when a Customer change address", () => {
    const customer = new Customer("123", "John");
    const address = new Address("Street 1", 1, "Zip", "City");
    customer.changeAddress(address);
    expect((EnviaConsoleLogHandler as jest.Mock).mock.instances[0].handle).toHaveBeenCalled();
  });
});