import express, { Request, Response } from "express";
import { Pet } from "../models/pet";
import { isArrayOfValidMongoIds } from "../utils";
import { BadRequestError } from "@giveapaw/common";
import { petProjection } from "../pet-projection";
import { Recommendation } from "../models/recommendation";

const router = express.Router();

router.get("/api/pets", async (req: Request, res: Response) => {
  const { limit } = req.query;
  let query = Pet.find({}, { ...petProjection, userId: 1 });

  if (req.currentUser?.role === "admin") {
    if (limit) {
      query = query.limit(parseInt(limit as string, 10));
    }

    const pets = await query.exec();
    return res.send(pets);
  }

  if (limit) {
    query = query.limit(parseInt(limit as string, 10));
  }

  const queryPets = await query.exec(); // Execute the query

  const filteredPets = queryPets.filter(
    (pet) => req.currentUser?.id === pet.userId || pet.status === "active"
  );

  const recommendations = await Recommendation.findOne({
    userId: req.currentUser?.id,
  });

  if (!recommendations) {
    return res.send(filteredPets);
  }

  const filteredAndSortedPets = filteredPets.map((pet) => {
    // Find the corresponding recommendation, if it exists
    const recommendation = recommendations.pets.find(
      (r: any) => r.petId === pet.id
    );
    const score = pet.userId !== req.currentUser?.id ? recommendation.score : 0;
    // Create a new object with the pet data and the score (if found)
    return {
      ...pet.toObject(),
      id: pet.toObject()._id,
      score,
    };
  });

  // Sort the pets by score in descending order
  filteredAndSortedPets.sort((petA, petB) => petB.score - petA.score);

  res.send(filteredAndSortedPets);
});

export { router as indexPetRouter };
