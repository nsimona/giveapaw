import { Publisher, Subjects, UserPreferencesUpdated } from "@giveapaw/common";

export class UserPreferencesUpdatedPublisher extends Publisher<UserPreferencesUpdated> {
  readonly subject = Subjects.UserPreferencesUpdated;
}
