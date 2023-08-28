import request from "supertest";
import { app } from "../../app";
import { Pet } from "../../models/pet";
import { natsWrapper } from "src/nats-wrapper";

describe("Create a new pet", () => {
  it("has a route handler api/pets/ listening for post request", async () => {
    const response = await request(app).post("/api/pets").send({});
    expect(response.statusCode).not.toEqual(404);
  });

  it("can only be accessed if the user is signed in", async () => {
    const response = await request(app).post("/api/pets").send({});
    expect(response.statusCode).toEqual(401);
  });

  it("return status other than 401 if the user is signed in", async () => {
    const response = await request(app)
      .post("/api/pets")
      .set("Cookie", global.signin())
      .send({});
    expect(response.statusCode).not.toEqual(401);
  });

  it("returns an error if an invalid name is provided", async () => {
    const response = await request(app)
      .post("/api/pets")
      .set("Cookie", global.signin())
      .send({
        name: "",
        type: "dog",
      });
    expect(response.statusCode).toEqual(400);
  });

  it("returns an error if an invalid type is provided", async () => {
    const response = await request(app)
      .post("/api/pets")
      .set("Cookie", global.signin())
      .send({
        name: "Pluto",
        type: "",
      });
    expect(response.statusCode).toEqual(400);
  });

  it("creates a pet with valid inputs", async () => {
    let pets = await Pet.find({});
    expect(pets.length).toEqual(0);

    const name = "Pluto";
    const type = "dog";

    const response = await request(app)
      .post("/api/pets")
      .set("Cookie", global.signin())
      .send({
        name,
        type,
      });
    expect(response.statusCode).toEqual(201);

    pets = await Pet.find({});
    expect(pets.length).toEqual(1);
    expect(pets[0].name).toEqual(name);
    expect(pets[0].type).toEqual(type);
  });

  it("publishes an event", async () => {
    let pets = await Pet.find({});
    expect(pets.length).toEqual(0);

    const name = "Pluto";
    const type = "dog";

    const response = await request(app)
      .post("/api/pets")
      .set("Cookie", global.signin())
      .send({
        name,
        type,
      });
    expect(response.statusCode).toEqual(201);
    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
