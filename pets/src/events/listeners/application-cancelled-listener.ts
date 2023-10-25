import {
  ApplicationCancelledEvent,
  Listener,
  Subjects,
} from "@giveapaw/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Pet } from "../../models/pet";
import { PetUpdatedPublisher } from "../publisher/pet-updated-publisher";

export class ApplicationCancelledListener extends Listener<ApplicationCancelledEvent> {
  subject: Subjects.ApplicationCancelled = Subjects.ApplicationCancelled;
  queueGroupName = queueGroupName;
  async onMessage(data: ApplicationCancelledEvent["data"], msg: Message) {
    const { id } = data;
    const pet = await Pet.findById(data.pet.id);
    if (!pet) {
      throw new Error("Pet not found");
    }
    pet.set({ status: "cancelled" });
    await pet.save();

    await new PetUpdatedPublisher(this.client).publish({
      id: pet.id,
      version: pet.version,
      name: pet.name,
      type: pet.type,
      age: pet.age,
      breed: pet.breed,
      gender: pet.gender,
      color: pet.color,
      size: pet.size,
      userId: pet.userId,
      trained: pet.trained,
      livedInAHouse: pet.livedInAHouse,
      healthState: pet.healthState,
      goodWith: pet.goodWith,
      characteristics: pet.characteristics,
      description: pet.description,
    });
    msg.ack();
  }
}
