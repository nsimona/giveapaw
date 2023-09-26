import { Listener, PetCreatedEvent, Subjects } from "@giveapaw/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Pet } from "../../models/pet";

export class PetCreatedListener extends Listener<PetCreatedEvent> {
  subject: Subjects.PetCreated = Subjects.PetCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: PetCreatedEvent["data"], msg: Message) {
    const { id, name, type, userId } = data;

    const pet = Pet.build({ name, type, id, ownerId: userId });
    await pet.save();

    msg.ack();
  }
}
