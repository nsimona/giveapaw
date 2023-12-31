import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@giveapaw/common";
import express, { Request, Response } from "express";
import { User } from "../models/user";
import { UserPreferencesUpdatedPublisher } from "../events/publishers/user-preferences-updated-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.patch(
  "/api/users/preferences",
  requireAuth,
  async (req: Request, res: Response) => {
    // add outdoorSpaces, currentHouse, ownerType
    const {
      firstTimeOwner,
      type,
      age,
      size,
      gender,
      color,
      trained,
      livedInAHouse,
      goodWith,
      houseConditions,
      characteristics,
    } = req.body;

    const preferences = {
      firstTimeOwner,
      type,
      age,
      size,
      color,
      gender,
      trained,
      livedInAHouse,
      goodWith,
      houseConditions,
      characteristics,
    };
    const userId = req.currentUser!.id;
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError();
    }

    user.preferences = preferences;
    await user.save();

    new UserPreferencesUpdatedPublisher(natsWrapper.client).publish({
      type,
      age,
      size,
      color,
      gender,
      trained,
      livedInAHouse,
      goodWith,
      houseConditions,
      characteristics,
      userId,
      version: 1, //TODO
    });

    res.status(200).send(user);
  }
);

export { router as updatePreferenceRouter };
