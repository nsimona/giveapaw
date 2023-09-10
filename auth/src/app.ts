import express, { json } from "express";
import "express-async-errors";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { currentUser, errorHandler, NotFoundError } from "@giveapaw/common";
import cookieSession from "cookie-session";
import { updatePreferenceRouter } from "./routes/preferences";
import { updateFavoritesRouter } from "./routes/favorites";

const app = express();
app.use(json());
app.set("trust proxy", true);

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use(currentUser);
app.use(updatePreferenceRouter);
app.use(updateFavoritesRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
