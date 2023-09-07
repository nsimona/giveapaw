import request from "supertest";
import { app } from "../../app";
import { Pet } from "../../models/pet";
import { petMock } from "../../test/helper";
import mongoose from "mongoose";

const buildPet = async () => {
  const pet = Pet.build({
    ...petMock,
    id: new mongoose.Types.ObjectId().toHexString(),
  });
  await pet.save();

  return pet;
};

it("fetches applications for a particular user", async () => {
  // Create three pets
  const petOne = await buildPet();
  const petTwo = await buildPet();
  const petThree = await buildPet();

  const userOne = global.signin();
  const userTwo = global.signin();
  // Create one order as User #1
  await request(app)
    .post("/api/applications")
    .set("Cookie", userOne)
    .send({ petId: petOne.id, userInfo: "432432" })
    .expect(201);

  // Create two applications as User #2
  const { body: applicationOne } = await request(app)
    .post("/api/applications")
    .set("Cookie", userTwo)
    .send({ petId: petTwo.id, userInfo: "432432" })
    .expect(201);
  const { body: applicationTwo } = await request(app)
    .post("/api/applications")
    .set("Cookie", userTwo)
    .send({ petId: petThree.id, userInfo: "432432" })
    .expect(201);

  // Make request to get applications for User #2
  const response = await request(app)
    .get("/api/applications")
    .set("Cookie", userTwo)
    .expect(200);

  // Make sure we only got the applications for User #2
  expect(response.body.length).toEqual(2);
  expect(response.body[0].id).toEqual(applicationOne.id);
  expect(response.body[1].id).toEqual(applicationTwo.id);
  expect(response.body[0].pet.id).toEqual(petTwo.id);
  expect(response.body[1].pet.id).toEqual(petThree.id);
});
