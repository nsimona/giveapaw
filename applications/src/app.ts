import express, { json } from "express";
import "express-async-errors";
import { currentUser, errorHandler, NotFoundError } from "@giveapaw/common";
import cookieSession from "cookie-session";
import { createPetRouter } from "./routes/new";
import { showPetRouter } from "./routes/show";
import { indexPetRouter } from "./routes";
import { updatePetRouter } from "./routes/update";

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

app.use(createPetRouter);
app.use(showPetRouter);
app.use(indexPetRouter);
app.use(updatePetRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
