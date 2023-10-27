import express, { Request, Response } from "express";
import { Pet } from "../models/pet";
import { isArrayOfValidMongoIds } from "../utils";
import { BadRequestError } from "@giveapaw/common";
import { petProjection } from "../pet-projection";
import getAllActivePets from "../db-requests/get-all-active-pets";
import getAllPets from "../db-requests/get-all-pets";
import getRecommendationsForUser from "../db-requests/get-recommendations-for-user";
import getPetsByUser from "../db-requests/get-pets-by-user";

const router = express.Router();

router.get("/api/pets/query", async (req: Request, res: Response) => {
  const { ids } = req.query;

  if (Object.keys(req.query).length === 0) {
    if (req.currentUser?.role === "admin") {
      const allPets = await getAllPets(0, petProjection);
      return res.send(allPets);
    }
  }

  // handle query pets by their ids
  if (ids !== undefined) {
    if (ids === "") {
      res.send([]);
      return;
    }
    const parseIds = ids.toString().split(",");

    if (!isArrayOfValidMongoIds(parseIds)) {
      throw new BadRequestError("Invalid id provided");
    }

    const pets = await Pet.find({ _id: { $in: parseIds } });
    res.send(pets);
    return;
  }

  const activePets = await getAllActivePets(0, petProjection, req.query);

  if (req.currentUser?.id) {
    const userId = req.currentUser?.id;
    // pets owned by the current user
    const userPets = await getPetsByUser(userId, 0, petProjection);
    // pets recommended for the current user
    const recommendations = await getRecommendationsForUser(userId);
    // remove owned by the user pets
    const filteredPets = activePets.filter(
      (pet) => !userPets.some((userPet) => userPet.id === pet.id)
    );
    // if recommended pets -> move the in the beginning of the array
    if (recommendations) {
      const sortedVyRecommendation = filteredPets
        .map((pet) => {
          // Find the corresponding recommendation, if it exists
          const recommendation = recommendations.pets.find(
            (r: any) => r.petId === pet.id
          );
          const score =
            pet.userId !== req.currentUser?.id ? recommendation.score : 0;
          // Create a new object with the pet data and the score (if found)
          return {
            ...pet.toObject(),
            id: pet.toObject()._id,
            score,
          };
        })
        .sort((petA, petB) => petB.score - petA.score);
      res.send(sortedVyRecommendation);
      return;
    }
    res.send(filteredPets);
  }

  res.send(activePets);
});

export { router as queryPetRouter };
