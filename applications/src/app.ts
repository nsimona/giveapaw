import express, { json } from "express";
import "express-async-errors";
import { currentUser, errorHandler, NotFoundError } from "@giveapaw/common";
import cookieSession from "cookie-session";
import { indexApplicationRouter } from "./routes";
import { deleteApplciationRouter } from "./routes/delete";
import { showApplicationRouter } from "./routes/show";
import { newApplicationRouter } from "./routes/new";

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

app.use(indexApplicationRouter);
app.use(showApplicationRouter);
app.use(newApplicationRouter);
app.use(deleteApplciationRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
