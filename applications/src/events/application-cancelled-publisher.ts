import {
  ApplicationCancelledEvent,
  Publisher,
  Subjects,
} from "@giveapaw/common";

export class ApplicationCancelledPublisher extends Publisher<ApplicationCancelledEvent> {
  subject: Subjects.ApplicationCancelled = Subjects.ApplicationCancelled;
}
