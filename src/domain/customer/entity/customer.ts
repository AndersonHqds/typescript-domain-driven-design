import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerAddressChangedEvent from "../events/customer/customer-address-changed.event";
import CustomerCreatedEvent from "../events/customer/customer-created.event";
import EnviaConsoleLog1Handler from "../events/customer/handlers/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "../events/customer/handlers/envia-console-log-2.handler";
import EnviaConsoleLogHandler from "../events/customer/handlers/envia-console-log.handler";
import Address from "../value-object/address";

export default class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;
  private eventDispatcher: EventDispatcher;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
    this.eventDispatcher = new EventDispatcher();
    this.notifyCustomerCreated();
  }

  private notifyCustomerCreated() {
    const enviaConsoleLog1Handler = new EnviaConsoleLog1Handler();
    const enviaConsoleLog2Handler = new EnviaConsoleLog2Handler();
    const customerCreatedEvent = new CustomerCreatedEvent({
      id: this._id,
      name: this._name
    });

    this.eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler);
    this.eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog2Handler);
    this.eventDispatcher.notify(customerCreatedEvent);
  }

  validate() {
    if (!this._id) {
      throw new Error("id is required");
    }
    if (!this._name) {
      throw new Error("Name is required");
    }
  }

  get id(): string {
    return this._id;
  }

  set name(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  set address(newAddress: Address) {
    this._address = newAddress;
  }

  get address(): Address {
    return this._address;
  }

  get eventsHandled() {
    return this.eventDispatcher.getEventHandlers();
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address) {
    this._address = address;
    const enviaConsoleLogHandler = new EnviaConsoleLogHandler();
    const customerChangeAddressEvent = new CustomerAddressChangedEvent({
      id: this._id,
      name: this._name,
      address: address
    });
    this.eventDispatcher.register("CustomerAddressChangedEvent", enviaConsoleLogHandler);
    this.eventDispatcher.notify(customerChangeAddressEvent);
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  
}