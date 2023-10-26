import { Listener, PetCreatedEvent, Subjects } from "@giveapaw/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { client } from "../../index";
import updateRecommendations from "../../utils/update-recommendations";

export class PetCreatedListener extends Listener<PetCreatedEvent> {
  subject: Subjects.PetCreated = Subjects.PetCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: PetCreatedEvent["data"], msg: Message) {
    const pet = JSON.stringify(data);
    await client.set(`pet:${data.id}`, pet);

    msg.ack();

    updateRecommendations();
    // generateRecommendations("");
  }
}
