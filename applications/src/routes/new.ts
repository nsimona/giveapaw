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
import { Pet } from "../models/pet";
import { Application } from "../models/application";

const EXPIRATION_DAYS = 15;

const router = express.Router();

router.post(
  "/api/applications",
  requireAuth,
  [
    body("petId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("valid petId must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { petId, message, userInfo } = req.body;
    const pet = await Pet.findById(petId);
    if (!pet) {
      throw new NotFoundError();
    }
    // there is an application for this pet, that has been already approved, i.e. the pet is adopted
    const isAdopted = await pet.isAdopted();
    if (isAdopted) {
      throw new BadRequestError(
        "Application for this pet has already been approved"
      );
    }

    const expiration = new Date();
    expiration.setDate(expiration.getDate() + EXPIRATION_DAYS);

    const application = Application.build({
      userId: req.currentUser!.id,
      status: ApplicationStatus.Created,
      expiresAt: expiration,
      message,
      pet,
      userInfo,
    });

    await application.save();

    //send event to nats

    res.status(201).send(application);
  }
);

export { router as newApplicationRouter };
