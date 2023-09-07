import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { PetUpdatedEvent } from "@giveapaw/common";
import { PetUpdatedListener } from "../pet-updated-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Pet } from "../../../models/pet";
import { petMock } from "../../../test/helper";

const setup = async () => {
  // Create a listener
  const listener = new PetUpdatedListener(natsWrapper.client);

  // Create and save a pet
  const pet = Pet.build({
    ...petMock,
    id: new mongoose.Types.ObjectId().toHexString(),
  });
  await pet.save();

  // Create a fake data object
  const data: PetUpdatedEvent["data"] = {
    ...petMock,
    id: pet.id,
    version: pet.version + 1,
  };

  // Create a fake msg object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  // return all of this stuff
  return { msg, data, pet, listener };
};

it("finds, updates, and saves a pet", async () => {
  const { msg, data, pet, listener } = await setup();

  await listener.onMessage(data, msg);

  const updatedPet = await Pet.findById(pet.id);

  expect(updatedPet!.name).toEqual(data.name);
  expect(updatedPet!.type).toEqual(data.type);
  expect(updatedPet!.version).toEqual(data.version);
});

it("acks the message", async () => {
  const { msg, data, listener } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it("does not call ack if the event has a skipped version number", async () => {
  const { msg, data, listener, pet } = await setup();

  data.version = 10;

  try {
    await listener.onMessage(data, msg);
  } catch (err) {}

  expect(msg.ack).not.toHaveBeenCalled();
});
