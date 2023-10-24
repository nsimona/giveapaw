import { Listener, UserPreferencesUpdated, Subjects } from "@giveapaw/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { client } from "../../index";
import generateRecommendations from "../../utils/generate-recommendations";

export class UserPreferencesUpdatedListener extends Listener<UserPreferencesUpdated> {
  subject: Subjects.UserPreferencesUpdated = Subjects.UserPreferencesUpdated;
  queueGroupName = queueGroupName;
  async onMessage(data: UserPreferencesUpdated["data"], msg: Message) {
    const user = JSON.stringify(data);
    await client.set(`preference:${data.userId}`, user);

    msg.ack();

    generateRecommendations(data.userId);
  }
}
