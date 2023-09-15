import express, { Request, Response } from "express";
import { Pet } from "../models/pet";
import { isArrayOfValidMongoIds } from "../utils";
import { BadRequestError } from "@giveapaw/common";

const router = express.Router();

router.get("/api/pets", async (req: Request, res: Response) => {
  const pets = await Pet.find(
    {},
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
});

export { router as indexPetRouter };
