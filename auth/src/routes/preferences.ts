import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@giveapaw/common";
import express, { Request, Response } from "express";
import { User } from "../models/user";

const router = express.Router();

router.patch(
  "/api/users/preferences",
  requireAuth,
  async (req: Request, res: Response) => {
    const {
      firstTimeOwner,
      type,
      age,
      size,
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
      trained,
      livedInAHouse,
      goodWith,
      houseConditions,
      characteristics,
    };
    const userId = req.currentUser?.id;
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError();
    }

    // use aggregate function
    if (user._id.toString() !== userId) {
      throw new NotAuthorizedError();
    }

    // const updatedUser = await User.findByIdAndUpdate(
    //   userId,
    //   { $set: preferences },
    //   { new: true } // Return the updated document
    // );
    user.preferences = preferences;

    await user.save();

    res.status(200).send(user);
  }
);

export { router as updatePreferenceRouter };
