import request from "supertest";
import { app } from "../../app";

describe("Get all pets", () => {
  it("can fetch a list of pets", async () => {
    await request(app).post("/api/pets").set("Cookie", global.signin()).send({
      name: "Pluto",
      type: "dog",
    });
    await request(app).post("/api/pets").set("Cookie", global.signin()).send({
      name: "Pluto",
      type: "dog",
    });

    const response = await request(app).get("/api/pets").send().expect(200);

    expect(response.body.length).toEqual(2);
  });
});
