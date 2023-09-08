import { ApplicationCreatedEvent, Listener, Subjects } from "@giveapaw/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Pet } from "../../models/pet";
import { PetUpdatedPublisher } from "../publisher/pet-updated-publisher";

export class ApplicationCreatedListener extends Listener<ApplicationCreatedEvent> {
  subject: Subjects.ApplicationCreated = Subjects.ApplicationCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: ApplicationCreatedEvent["data"], msg: Message) {
    const { id } = data;
    const pet = await Pet.findById(data.pet.id);
    if (!pet) {
      throw new Error("Pet not found");
    }
    pet.set({ applicationId: id });
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
      applicationId: pet.applicationId,
    });
    msg.ack();
  }
}
