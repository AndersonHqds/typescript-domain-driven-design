import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
  private eventsHandlers: Record<string, EventHandlerInterface[]> = {};
  notify(event: EventInterface): void {
    if (!this.eventsHandlers[event.constructor.name]) {
      return;
    }
    this.eventsHandlers[event.constructor.name].forEach((eventHandler) => {
      eventHandler.handle(event);
    });
  }
  register(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
    if (!this.eventsHandlers[eventName]) {
      this.eventsHandlers[eventName] = [];
    }

    this.eventsHandlers[eventName].push(eventHandler);
  }
  unregister(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
    if (!this.eventsHandlers[eventName]) {
      return;
    }

    const index = this.eventsHandlers[eventName].indexOf(eventHandler);
    if (index !== -1) {
      this.eventsHandlers[eventName].splice(index, 1);
    }
  }
  unregisterAll(): void {
    this.eventsHandlers = {};
  }

  getEventHandlers() {
    return this.eventsHandlers;
  }
}