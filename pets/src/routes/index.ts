import express, { Request, Response } from "express";
import { Pet } from "../models/pet";
import { isArrayOfValidMongoIds } from "../utils";
import { BadRequestError } from "@giveapaw/common";
import { petProjection } from "../pet-projection";

const router = express.Router();

router.get("/api/pets", async (req: Request, res: Response) => {
  const pets = await Pet.find({}, petProjection);

  res.send(pets);
});

export { router as indexPetRouter };
