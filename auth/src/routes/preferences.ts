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
      userId,
      favs,
      firstTimeOwner,
      preferredPetType,
      preferredPetAge,
      preferredPetBreed,
      preferredPetSize,
      preferredPetColor,
      preferredPetIsTrained,
      preferredPetLivedInAHouse,
      preferredPetGoodWith,
      currentHouseConditions,
    } = req.body;

    const preferences = {
      favs,
      firstTimeOwner,
      preferredPetType,
      preferredPetAge,
      preferredPetBreed,
      preferredPetSize,
      preferredPetColor,
      preferredPetIsTrained,
      preferredPetLivedInAHouse,
      preferredPetGoodWith,
      currentHouseConditions,
    };

    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError();
    }

    // use aggregate function
    if (user._id.toString() !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: preferences },
      { new: true } // Return the updated document
    );

    res.status(200).send(updatedUser);
  }
);

export { router as updatePreferenceRouter };
