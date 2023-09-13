import express, { Request, Response } from "express";
import { Pet } from "../models/pet";
import { isArrayOfValidMongoIds } from "../utils";
import { BadRequestError, requireAuth } from "@giveapaw/common";

const router = express.Router();

router.get(
  "/api/pets/query",
  requireAuth,
  async (req: Request, res: Response) => {
    const { userId, type, size, breed, age, ids } = req.query;

    if (!userId) {
      throw new BadRequestError("no query parameter provided");
    }

    const pets = await Pet.find(
      { userId },
      {
        name: 1,
        breed: 1,
        age: 1,
        size: 1,
        gender: 1,
        // TODO add cover pic also
      }
    );

    res.send(pets);
  }
);

export { router as queryPetRouter };
