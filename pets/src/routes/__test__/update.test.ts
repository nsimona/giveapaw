import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { petMock } from "../../test/helper";
import { Pet } from "../../models/pet";

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/pets/${id}`)
    .set("Cookie", global.signin())
    .send({
      name: "Pluto",
      type: "dog",
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/pets/${id}`)
    .send({
      name: "Pluto",
      type: "dog",
    })
    .expect(401);
});

it("returns a 401 if the user does not own the pet", async () => {
  const response = await request(app)
    .post("/api/pets")
    .set("Cookie", global.signin())
    .send(petMock);

  await request(app)
    .put(`/api/pets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({
      ...petMock,
      name: "Venus",
    })
    .expect(401);
});

it("returns a 400 if the user provides an invalid name or type", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post("/api/pets")
    .set("Cookie", cookie)
    .send({
      name: "Pluto",
      type: "dog",
    });

  await request(app)
    .put(`/api/pets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      name: "",
      type: "",
    })
    .expect(400);
});

it("updates the pet provided valid inputs", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post("/api/pets")
    .set("Cookie", cookie)
    .send(petMock);

  await request(app)
    .put(`/api/pets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      ...petMock,
      name: "Pluto The Dog",
      type: "dog",
    })
    .expect(200);

  const pet = await request(app).get(`/api/pets/${response.body.id}`).send();

  expect(pet.body.name).toEqual("Pluto The Dog");
});

it("rejects updates if the pet is reserved", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/pets")
    .set("Cookie", cookie)
    .send(petMock);

  const pet = await Pet.findById(response.body.id);
  pet!.set({ applicationId: new mongoose.Types.ObjectId().toHexString() });
  await pet!.save();

  await request(app)
    .put(`/api/pets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      name: "Venus",
    })
    .expect(400);
});
