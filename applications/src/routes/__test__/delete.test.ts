import request from "supertest";
import { app } from "../../app";
import { Pet } from "../../models/pet";
import { Application } from "../../models/application";
import { ApplicationStatus } from "@giveapaw/common";
import { natsWrapper } from "../../nats-wrapper";
import { petMock } from "../../test/helper";
import mongoose from "mongoose";

it("marks an application as cancelled", async () => {
  // create a pet with Pet Model
  const pet = Pet.build({
    ...petMock,
    id: new mongoose.Types.ObjectId().toHexString(),
  });
  await pet.save();

  console.log(pet.id);

  const user = global.signin();
  // make a request to create an application
  const { body: application } = await request(app)
    .post("/api/applications")
    .set("Cookie", user)
    .send({ petId: pet.id, message: "465", userInfo: "123" })
    .expect(201);

  // make a request to cancel the application
  await request(app)
    .delete(`/api/applications/${application.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  // expectation to make sure the thing is cancelled
  const updatedApplication = await Application.findById(application.id);

  expect(updatedApplication!.status).toEqual(ApplicationStatus.Cancelled);
});

it("emits a application cancelled event", async () => {
  const pet = Pet.build({
    ...petMock,
    id: new mongoose.Types.ObjectId().toHexString(),
  });
  await pet.save();

  const user = global.signin();
  // make a request to create an application
  const { body: application } = await request(app)
    .post("/api/applications")
    .set("Cookie", user)
    .send({ petId: pet.id, userInfo: "123" })
    .expect(201);

  // make a request to cancel the application
  await request(app)
    .delete(`/api/applications/${application.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
