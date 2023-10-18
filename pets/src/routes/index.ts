import express, { Request, Response } from "express";
import { Pet } from "../models/pet";
import { isArrayOfValidMongoIds } from "../utils";
import { BadRequestError } from "@giveapaw/common";
import { petProjection } from "../pet-projection";

const router = express.Router();

router.get("/api/pets", async (req: Request, res: Response) => {
  const pets = await Pet.find({}, { ...petProjection, userId: 1 });

  if (req.currentUser?.role === "admin") {
    res.send(pets);
    return;
  }

  const filteredPets = pets.filter(
    (pet) => req.currentUser?.id === pet.userId || pet.status === "active"
  );
  res.send(filteredPets);
});

export { router as indexPetRouter };
