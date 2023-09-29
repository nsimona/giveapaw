import express, { Request, Response } from "express";
import {
  validateRequest,
  NotFoundError,
  NotAuthorizedError,
  requireAuth,
  BadRequestError,
} from "@giveapaw/common";
import { Pet } from "../models/pet";
import { body } from "express-validator";
import { PetUpdatedPublisher } from "../events/publisher/pet-updated-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.put(
  "/api/pets/:id",
  requireAuth,
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("type").not().isEmpty().withMessage("Type is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      throw new NotFoundError();
    }

    if (pet.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    if (pet.applicationId) {
      throw new BadRequestError("Pet has pending applications");
    }

    if (pet.status !== "active") {
      throw new BadRequestError("You can't update this pet");
    }

    const {
      name,
      type,
      age = null,
      breed,
      gender,
      color,
      size,
      trained = null,
      livedInAHouse = [],
      healthState = null,
      goodWith = [],
      characteristics = [],
      description = null,
      selectedFiles = [],
      selectedCoverIndex = null,
    } = req.body;

    pet.set({
      name,
      type,
      age,
      breed,
      gender,
      color,
      size,
      trained,
      livedInAHouse,
      healthState,
      goodWith,
      characteristics,
      description,
      selectedFiles,
      selectedCoverIndex,
    });

    await pet.save();

    await new PetUpdatedPublisher(natsWrapper.client).publish({
      id: pet.id,
      name,
      type,
      userId: pet.userId,
      age,
      breed,
      gender,
      color,
      size,
      trained,
      livedInAHouse,
      healthState,
      goodWith,
      characteristics,
      description,
      version: pet.version,
    });

    res.send(pet);
  }
);

export { router as updatePetRouter };
