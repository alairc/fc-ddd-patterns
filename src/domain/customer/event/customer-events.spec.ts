import EventDispatcher from '../../@shared/event/event-dispatcher';
import { EnviaConsoleLogHandler } from "./handler/envia-console-log.handler";
import { CustomerCreatedEvent } from "./customer-created.events";
import { EnviaConsoleLog1Handler } from "./handler/envia-console-log1.handler";
import { EnviaConsoleLog2Handler } from "./handler/envia-console-log2.handler";
import { CustomerChangedAddressEvent } from "./customer-changed-address.events";


describe("Cusomer events tests", () => {
  it("should notify customer created an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();

    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]).toMatchObject(eventHandler);
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1]).toMatchObject(eventHandler2);

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: 'Customer 1'
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it('should notify customer changed address', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    
    eventDispatcher.register('CustomerChangedAddressEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers['CustomerChangedAddressEvent'][0]).toMatchObject(eventHandler);

    const customerChangedAddressEvent = new CustomerChangedAddressEvent({
      id: 1,
      name: 'Customer 1',
      address: 'address do customer 1'
    });

    eventDispatcher.notify(customerChangedAddressEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

});
