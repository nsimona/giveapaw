import { ApplicationCreatedEvent, Publisher, Subjects } from "@giveapaw/common";

export class ApplicationCreatedPublisher extends Publisher<ApplicationCreatedEvent> {
  subject: Subjects.ApplicationCreated = Subjects.ApplicationCreated;
}
