import CustomerCreatedEvent from "../../customer/events/customer/customer-created.event";
import EnviaConsoleLog1Handler from "../../customer/events/customer/handlers/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "../../customer/events/customer/handlers/envia-console-log-2.handler";
import SendEmailWhenProductIsCreatedHandler from "../../product/events/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/events/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain Events tests", () => {
  describe("Product Created Events", () => {
    it("should register event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();
  
      eventDispatcher.register("ProductCreatedEvent", eventHandler);
      expect(eventDispatcher.getEventHandlers()["ProductCreatedEvent"]).toBeDefined();
      expect(eventDispatcher.getEventHandlers()["ProductCreatedEvent"].length).toBe(1);
      expect(eventDispatcher.getEventHandlers()["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    });
  
    it("should unregister event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();
  
      eventDispatcher.register("ProductCreatedEvent", eventHandler);
      expect(eventDispatcher.getEventHandlers()["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
  
      eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
      expect(eventDispatcher.getEventHandlers()["ProductCreatedEvent"]).toBeDefined();
      expect(eventDispatcher.getEventHandlers()["ProductCreatedEvent"].length).toBe(0);
    });
  
    it("should unregister all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();
      const eventHandler2 = new SendEmailWhenProductIsCreatedHandler();
  
      eventDispatcher.register("ProductCreatedEvent", eventHandler);
      eventDispatcher.register("ProductCreatedEvent", eventHandler2);
  
      expect(eventDispatcher.getEventHandlers()["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
      expect(eventDispatcher.getEventHandlers()["ProductCreatedEvent"][1]).toMatchObject(eventHandler2);
  
      eventDispatcher.unregisterAll();
  
      expect(eventDispatcher.getEventHandlers()["ProductCreatedEvent"]).toBeUndefined();
    });
  
    it("should notify all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();
      const eventHandler2 = new SendEmailWhenProductIsCreatedHandler();
      const spyEventHandler = jest.spyOn(eventHandler, "handle");
      const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
      
      eventDispatcher.register("ProductCreatedEvent", eventHandler);
      eventDispatcher.register("ProductCreatedEvent", eventHandler2);
  
      expect(eventDispatcher.getEventHandlers()["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
      expect(eventDispatcher.getEventHandlers()["ProductCreatedEvent"][1]).toMatchObject(eventHandler2);
  
      const event = new ProductCreatedEvent({
        name: "Product 1",
        description: "Product 1 description",
        email: "gJqJt@example.com",
        price: 10
      });
  
      eventDispatcher.notify(event);
  
      expect(spyEventHandler).toHaveBeenCalled();
      expect(spyEventHandler2).toHaveBeenCalled();
    });
  });
  
  describe("Customer Created Events", () => {
    it("should register event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new EnviaConsoleLog1Handler();

      eventDispatcher.register("CustomerCreatedEvent", eventHandler);
      expect(eventDispatcher.getEventHandlers()["CustomerCreatedEvent"]).toBeDefined();
      expect(eventDispatcher.getEventHandlers()["CustomerCreatedEvent"].length).toBe(1);
      expect(eventDispatcher.getEventHandlers()["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
    });

    it("should unregister event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new EnviaConsoleLog1Handler();

      eventDispatcher.register("CustomerCreatedEvent", eventHandler);
      expect(eventDispatcher.getEventHandlers()["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);

      eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);
      expect(eventDispatcher.getEventHandlers()["CustomerCreatedEvent"]).toBeDefined();
      expect(eventDispatcher.getEventHandlers()["CustomerCreatedEvent"].length).toBe(0);
    });

    it("should unregister all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new EnviaConsoleLog1Handler();
      const eventHandler2 = new EnviaConsoleLog2Handler();

      eventDispatcher.register("CustomerCreatedEvent", eventHandler);
      eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

      expect(eventDispatcher.getEventHandlers()["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
      expect(eventDispatcher.getEventHandlers()["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

      eventDispatcher.unregisterAll();

      expect(eventDispatcher.getEventHandlers()["CustomerCreatedEvent"]).toBeUndefined();
    });

    it("should notify all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new EnviaConsoleLog1Handler();
      const eventHandler2 = new EnviaConsoleLog2Handler();
      const spyEventHandler = jest.spyOn(eventHandler, "handle");
      const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
      
      eventDispatcher.register("CustomerCreatedEvent", eventHandler);
      eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

      expect(eventDispatcher.getEventHandlers()["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
      expect(eventDispatcher.getEventHandlers()["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

      const event = new CustomerCreatedEvent({
        name: "Customer 1",
        email: "gJqJt@example.com"
      });

      eventDispatcher.notify(event);

      expect(spyEventHandler).toHaveBeenCalled();
      expect(spyEventHandler2).toHaveBeenCalled();
    });
  });
})