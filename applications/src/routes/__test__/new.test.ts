import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Application } from "../../models/application";
import { Pet } from "../../models/pet";
import { ApplicationStatus } from "@giveapaw/common";

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
    name: "Pluto",
    type: "dog",
  });
  await pet.save();

  await request(app)
    .post("/api/applications")
    .set("Cookie", global.signin())
    .send({ petId: pet.id, message: "465", userInfo: "123" })
    .expect(201);
});

it.todo("emits an application created event");
