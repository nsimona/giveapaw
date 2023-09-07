import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Pet } from "../../models/pet";
import { natsWrapper } from "../../nats-wrapper";
import { petMock } from "../../test/helper";

it("returns an error if the pet does not exist", async () => {
  const petId = new mongoose.Types.ObjectId();

  await request(app)
    .post("/api/applications")
    .set("Cookie", global.signin())
    .send({ petId, message: "465", userInfo: "123" })
    .expect(404);
});

it("saves the application for the pet", async () => {
  const pet = Pet.build({
    ...petMock,
    id: new mongoose.Types.ObjectId().toHexString(),
  });
  await pet.save();

  await request(app)
    .post("/api/applications")
    .set("Cookie", global.signin())
    .send({ petId: pet.id, message: "465", userInfo: "123" })
    .expect(201);
});

it("emits an application created event", async () => {
  const pet = Pet.build({
    ...petMock,
    id: new mongoose.Types.ObjectId().toHexString(),
  });
  await pet.save();

  await request(app)
    .post("/api/applications")
    .set("Cookie", global.signin())
    .send({ petId: pet.id, userInfo: "123" })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
