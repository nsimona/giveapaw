import mongoose from "mongoose";
import { DatabaseConnectionError } from "@giveapaw/common";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { ApplicationCancelledListener } from "./events/listeners/application-cancelled-listener";
import { ApplicationCreatedListener } from "./events/listeners/application-created-listener";
import { RecommendationsGeneratedListener } from "./events/listeners/recommendations-genreated-listener";
import { dbSeed } from "./db-seed";

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
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    // v2 Listen for created applications and lock updates if there are pending
    // new ApplicationCancelledListener(natsWrapper.client).listen();
    // new ApplicationCreatedListener(natsWrapper.client).listen();

    new RecommendationsGeneratedListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to MongoDB");
  } catch (error) {
    console.error("db connection error", error);

    throw new DatabaseConnectionError();
  }
  app.listen(3000, () => {
    console.log("Pets -> Listening on port 3000");
    // dbSeed();
  });
};

start();
