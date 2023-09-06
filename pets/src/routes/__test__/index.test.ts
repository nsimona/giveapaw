import request from "supertest";
import { app } from "../../app";
import { petMock } from "../../test/helper";

describe("Get all pets", () => {
  it("can fetch a list of pets", async () => {
    await request(app)
      .post("/api/pets")
      .set("Cookie", global.signin())
      .send(petMock);
    await request(app)
      .post("/api/pets")
      .set("Cookie", global.signin())
      .send(petMock);

    const response = await request(app).get("/api/pets").send().expect(200);

    expect(response.body.length).toEqual(2);
  });
});
