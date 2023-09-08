import { Message } from "node-nats-streaming";
import mongoose from "mongoose";
import { ApplicationCreatedEvent, ApplicationStatus } from "@giveapaw/common";
import { ApplicationCreatedListener } from "../application-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Pet } from "../../../models/pet";
import { petMock } from "../../../test/helper";

const setup = async () => {
  // Create an instance of the listener
  const listener = new ApplicationCreatedListener(natsWrapper.client);

  // Create and save a pet
  const pet = Pet.build(petMock);
  await pet.save();

  // Create the fake data event
  const data: ApplicationCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: ApplicationStatus.Created,
    userId: "alskdfj",
    expiresAt: "alskdjf",
    pet: {
      id: pet.id,
      name: pet.name,
      type: pet.type,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, pet, data, msg };
};

it("sets the userId of the pet", async () => {
  const { listener, pet, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedPet = await Pet.findById(pet.id);

  expect(updatedPet!.applicationId).toEqual(data.id);
});

it("acks the message", async () => {
  const { listener, pet, data, msg } = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it("publishes a pet updated event", async () => {
  const { listener, pet, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const petUpdatedData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );

  expect(data.id).toEqual(petUpdatedData.applicationId);
});
