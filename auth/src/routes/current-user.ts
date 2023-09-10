import express from "express";
import jwt from "jsonwebtoken";
import {
  NotAuthorizedError,
  NotFoundError,
  currentUser,
} from "@giveapaw/common";
import { User } from "../models/user";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, async (req, res) => {
  if (!req.currentUser) {
    res.send({});
    return;
  }

  const user = await User.findById(req.currentUser.id);
  if (!user) {
    throw new NotFoundError();
  }

  res.send(user);
});

export { router as currentUserRouter };
