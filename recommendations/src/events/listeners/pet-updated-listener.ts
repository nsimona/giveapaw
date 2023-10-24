import { Listener, PetUpdatedEvent, Subjects } from "@giveapaw/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { client } from "../../index";
import updateRecommendations from "../../utils/update-recommendations";

export class PetUpdatedListener extends Listener<PetUpdatedEvent> {
  subject: Subjects.PetUpdated = Subjects.PetUpdated;
  queueGroupName = queueGroupName;
  async onMessage(data: PetUpdatedEvent["data"], msg: Message) {
    const pet = JSON.stringify(data);
    await client.set(`pet:${data.id}`, pet);

    msg.ack();

    updateRecommendations();
  }
}
