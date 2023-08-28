import { PetUpdatedEvent, Publisher, Subjects } from "@giveapaw/common";

export class PetUpdatedPublisher extends Publisher<PetUpdatedEvent> {
  readonly subject = Subjects.PetUpdated;
}
