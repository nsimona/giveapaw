import { Message } from "node-nats-streaming";
import mongoose from "mongoose";
import { PetCreatedEvent } from "@giveapaw/common";
import { PetCreatedListener } from "../pet-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Pet } from "../../../models/pet";
import { petMock } from "../../../test/helper";

const setup = async () => {
  // create an instance of the listener
  const listener = new PetCreatedListener(natsWrapper.client);

  // create a fake data event
  const data: PetCreatedEvent["data"] = {
    ...petMock,
    version: 0,
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it("creates and saves a pet", async () => {
  const { listener, data, msg } = await setup();

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  // write assertions to make sure a pet was created!
  const pet = await Pet.findById(data.id);

  expect(pet).toBeDefined();
  expect(pet!.name).toEqual(data.name);
  expect(pet!.type).toEqual(data.type);
});

it("acks the message", async () => {
  const { data, listener, msg } = await setup();

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  // write assertions to make sure ack function is called
  expect(msg.ack).toHaveBeenCalled();
});
