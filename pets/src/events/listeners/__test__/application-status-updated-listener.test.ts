import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { ApplicationCancelledEvent } from "@giveapaw/common";
import { natsWrapper } from "../../../nats-wrapper";
import { ApplicationCancelledListener } from "../application-status-updated-listener";
import { Pet } from "../../../models/pet";
import { petMock } from "../../../test/helper";

const setup = async () => {
  const listener = new ApplicationCancelledListener(natsWrapper.client);

  const applicationId = new mongoose.Types.ObjectId().toHexString();
  const pet = Pet.build(petMock);
  pet.set({ applicationId });
  await pet.save();

  const data: ApplicationCancelledEvent["data"] = {
    id: applicationId,
    version: 0,
    pet: {
      id: pet.id,
      name: "Pluto",
      type: "dog",
    },
    userId: "asdf",
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { msg, data, pet, applicationId, listener };
};

it("updates the pet, publishes an event, and acks the message", async () => {
  const { msg, data, pet, applicationId, listener } = await setup();

  await listener.onMessage(data, msg);

  const updatedpet = await Pet.findById(pet.id);
  expect(updatedpet!.applicationId).not.toBeDefined();
  expect(msg.ack).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
