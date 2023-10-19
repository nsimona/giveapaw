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

    // if (pet.status !== "active") {
    //   throw new BadRequestError("You can't update this pet");
    // }

    const allowedProperties = [
      "name",
      "type",
      "age",
      "breed",
      "gender",
      "color",
      "size",
      "trained",
      "livedInAHouse",
      "healthState",
      "goodWith",
      "characteristics",
      "description",
      "selectedFiles",
      "selectedCoverIndex",
      // Add other allowed properties as needed
    ];

    const data: Record<string, any> = {};

    allowedProperties.forEach((property) => {
      if (req.body[property] !== undefined && req.body[property] !== null) {
        data[property] = req.body[property];
      }
    });
    console.log(data);

    pet.set(data);

    await pet.save();

    await new PetUpdatedPublisher(natsWrapper.client).publish({
      id: pet.id,
      name: pet.name,
      type: pet.type,
      userId: pet.userId,
      age: pet.age,
      breed: pet.breed,
      gender: pet.gender,
      color: pet.color,
      size: pet.size,
      trained: pet.trained,
      livedInAHouse: pet.livedInAHouse,
      healthState: pet.healthState,
      goodWith: pet.goodWith,
      characteristics: pet.characteristics,
      description: pet.description,
      version: pet.version,
    });

    res.send(pet);
  }
);

export { router as updatePetRouter };
