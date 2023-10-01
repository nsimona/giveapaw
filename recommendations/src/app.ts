import express, { json } from "express";
import "express-async-errors";
import { currentUser, errorHandler, NotFoundError } from "@giveapaw/common";
import cookieSession from "cookie-session";
import { matchRecommendationRouter } from "./routes/match";
import { testThreads } from "./events/publishers/recommendation-updated";

const app = express();
app.use(json());
app.set("trust proxy", true);

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);
app.use(matchRecommendationRouter);

testThreads();
app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
