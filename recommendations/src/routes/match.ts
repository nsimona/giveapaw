import mongoose from "mongoose";
import {
  ApplicationStatus,
  BadRequestError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@giveapaw/common";

import express, { Request, Response } from "express";
import { body } from "express-validator";
import { matchResult } from "../calculate-match";
// import { Pet } from "../models/pet";
// import { Application } from "../models/application";
// import { ApplicationCreatedPublisher } from "../events/publishers/application-created-publisher";
// import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/recommendations/match",
  requireAuth,
  //   [
  //     body("userId")
  //       .not()
  //       .isEmpty()
  //       .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
  //       .withMessage("valid userId must be provided"),
  //     body("petId")
  //       .not()
  //       .isEmpty()
  //       .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
  //       .withMessage("valid petId must be provided"),
  //   ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { score, matchedFeatures } = matchResult;
    // get the preferences
    // get pet features
    // calculate score and matching fields
    // return score and matching fields

    res.send({ score, matchedFeatures });
  }
);

export { router as matchRecommendationRouter };
