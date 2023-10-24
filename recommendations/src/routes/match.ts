import mongoose from "mongoose";
import { NotFoundError, requireAuth, validateRequest } from "@giveapaw/common";

import express, { Request, Response } from "express";
import { body } from "express-validator";
import { calculateMatch } from "../utils/calculate-match";
import { client } from "../index";
import { generalWeights } from "../utils/weights";

const router = express.Router();

router.post(
  "/api/recommendations/match",
  requireAuth,
  [
    body("userId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("valid userId must be provided"),
    body("petId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("valid petId must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { userId, petId } = req.body;
    const preferences = await client.get(`preference:${userId}`);
    const pet = await client.get(`pet:${petId}`);

    if (!pet) {
      console.error("Pet not found", petId);
      throw new NotFoundError();
    }

    if (!preferences) {
      res.send({ score: 0, matchedFeatures: [] });
      return;
    }

    const { score, matchedFeatures } = calculateMatch(
      JSON.parse(pet),
      JSON.parse(preferences),
      generalWeights
    );

    res.send({ score, matchedFeatures });
  }
);

export { router as matchRecommendationRouter };
