import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { petMock } from "../../test/helper";

describe("Show pet", () => {
  it("returns 404 if the pet is not found", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app).get(`/api/pets/${id}`).send().expect(404);
  });

  it("returns the pet if it is found", async () => {
    const response = await request(app)
      .post("/api/pets")
      .set("Cookie", global.signin())
      .send(petMock)
      .expect(201);
    const {
      body: { id },
    } = response;

    const petResponse = await request(app).get(`/api/pets/${id}`);
    expect(petResponse.body.name).toEqual(petMock.name);
    expect(petResponse.body.type).toEqual(petMock.type);
  });
});
