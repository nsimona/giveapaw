import mongoose from "mongoose";
import { DatabaseConnectionError } from "@giveapaw/common";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { PetCreatedListener } from "./events/listeners/pet-created-listener";
import { PetUpdatedListener } from "./events/listeners/pet-updated-listener";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("jwt key not found");
  }
  if (!process.env.MONGO_URI) {
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
  console.log("applications is working");
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

    new PetCreatedListener(natsWrapper.client).listen();
    new PetUpdatedListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongo db");
  } catch (error) {
    console.error("db connection error", error);

    throw new DatabaseConnectionError();
  }
  app.listen(3000, () => {
    console.log("Applications -> Listening on port 3000!!!");
  });
};

start();
