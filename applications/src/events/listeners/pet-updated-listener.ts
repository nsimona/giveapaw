import { Listener, PetUpdatedEvent, Subjects } from "@giveapaw/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Pet } from "../../models/pet";

export class PetUpdatedListener extends Listener<PetUpdatedEvent> {
  subject: Subjects.PetUpdated = Subjects.PetUpdated;
  queueGroupName = queueGroupName;
  async onMessage(data: PetUpdatedEvent["data"], msg: Message) {
    const { name, type } = data;
    const pet = await Pet.findByEvent(data);

    if (!pet) {
      throw new Error("Pet not found");
    }

    pet.set({ name, type });
    await pet.save();

    msg.ack();
  }
}
