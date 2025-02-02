import EventHandlerInterface from '../../../@shared/event/event-handler.interface';
import { CustomerCreatedEvent } from '../customer-created.events';

export class EnviaConsoleLog1Handler implements EventHandlerInterface<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    console.log('Esse é o primeiro console log do evento customerCreated');
  }
}
