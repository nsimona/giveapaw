import mongoose from "mongoose";
import { DatabaseConnectionError } from "@giveapaw/common";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("jwt key not found");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to MongoDB");
  } catch (error) {
    console.error("db connection error", error);

    throw new DatabaseConnectionError();
  }
  app.listen(3000, () => {
    console.log("Auth -> Listening on port 3000");
  });
};

start();
