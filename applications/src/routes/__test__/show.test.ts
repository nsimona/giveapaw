import request from "supertest";
import { app } from "../../app";
import { Pet } from "../../models/pet";
import { petMock } from "../../test/helper";
import mongoose from "mongoose";

it("fetches the application", async () => {
  // Create a pet
  const pet = Pet.build({
    ...petMock,
    id: new mongoose.Types.ObjectId().toHexString(),
  });
  await pet.save();

  const user = global.signin();
  // make a request to build an application with this pet
  const { body: application } = await request(app)
    .post("/api/applications")
    .set("Cookie", user)
    .send({ petId: pet.id, userInfo: "3213421" })
    .expect(201);

  // make request to fetch the application
  const { body: fetchedApplication } = await request(app)
    .get(`/api/applications/${application.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  expect(fetchedApplication.id).toEqual(application.id);
});

it("returns an error if one user tries to fetch another users application", async () => {
  // Create a pet
  const pet = Pet.build({
    ...petMock,
    id: new mongoose.Types.ObjectId().toHexString(),
  });
  await pet.save();

  const user = global.signin();
  // make a request to build an application with this pet
  const { body: application } = await request(app)
    .post("/api/applications")
    .set("Cookie", user)
    .send({ petId: pet.id, userInfo: "3213421" })
    .expect(201);

  // make request to fetch the application
  await request(app)
    .get(`/api/applications/${application.id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(401);
});
