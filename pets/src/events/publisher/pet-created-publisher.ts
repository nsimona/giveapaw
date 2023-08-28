import { PetCreatedEvent, Publisher, Subjects } from "@giveapaw/common";

export class PetCreatedPublisher extends Publisher<PetCreatedEvent> {
  readonly subject = Subjects.PetCreated;
}
