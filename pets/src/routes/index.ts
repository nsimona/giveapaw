import express, { Request, Response } from "express";
import { Pet } from "../models/pet";
import { isArrayOfValidMongoIds } from "../utils";
import { BadRequestError } from "@giveapaw/common";
import { petProjection } from "../pet-projection";
import { Recommendation } from "../models/recommendation";

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
  const recommendations = await Recommendation.findOne({
    userId: req.currentUser?.id,
  });

  if (!recommendations) {
    res.send(filteredPets);
    return;
  }

  const sortedPets = filteredPets.sort((a, b) => {
    const { pets } = recommendations;
    const idA = a.id;
    const idB = b.id;
    const indexA = pets.indexOf(idA);
    const indexB = pets.indexOf(idB);

    if (indexA === -1 && indexB === -1) {
      return 0;
    }
    if (indexA === -1) {
      return 1;
    }
    if (indexB === -1) {
      return -1;
    }

    return indexA - indexB;
  });

  res.send(sortedPets);
});

export { router as indexPetRouter };
