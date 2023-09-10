import {
  NotAuthorizedError,
  NotFoundError,
  currentUser,
  requireAuth,
} from "@giveapaw/common";
import express, { Request, Response } from "express";
import { User } from "../models/user";

const router = express.Router();

router.patch(
  "/api/users/favorites",
  requireAuth,
  async (req: Request, res: Response) => {
    const { favorites } = req.body;
    const userId = req.currentUser!.id;

    if (!userId) {
      throw new NotAuthorizedError();
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError();
    }

    // use aggregate function
    if (user._id.toString() !== userId) {
      throw new NotAuthorizedError();
    }

    const updatedFavorites = await User.findByIdAndUpdate(
      userId,
      { $set: { favorites } },
      { new: true } // Return the updated document
    );

    res.status(200).send(updatedFavorites.favorites);
  }
);

export { router as updateFavoritesRouter };
