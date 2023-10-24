// import { DatabaseConnectionError } from "@giveapaw/common";
import { DatabaseConnectionError } from "@giveapaw/common";
import { app } from "./app";
import { createClient } from "redis";
import { PetCreatedListener } from "./events/listeners/pet-created-listener";
import { natsWrapper } from "./nats-wrapper";
import { PetUpdatedListener } from "./events/listeners/pet-updated-listener";
import { UserPreferencesUpdatedListener } from "./events/listeners/user-preferences-updated-listener";

export const client = createClient({
  url: process.env.REDIS_URI,
});

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("jwt key not found");
  }
  if (!process.env.REDIS_URI) {
    throw new Error("mongo uri not defined");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defined");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("nats connection closed");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    await client.connect();
    console.log("connected to redis");

    new PetCreatedListener(natsWrapper.client).listen();
    new PetUpdatedListener(natsWrapper.client).listen();
    new UserPreferencesUpdatedListener(natsWrapper.client).listen();
  } catch (error) {
    console.error("redis connection error", error);
    throw new DatabaseConnectionError();
  }

  app.listen(3000, () => {
    console.log("Recommendations -> Listening on port 3000");
  });
};

start();
