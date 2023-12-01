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

  const activePets = await getAllActivePets(petProjection, 100, req.query);

  //logged user
  if (req.currentUser?.id) {
    const userId = req.currentUser?.id;
    const userPets = await getPetsByUser(userId, 100, petProjection);

    // remove owned by the user pets
    const filteredPets = activePets.filter(
      (pet) => !userPets.some((userPet) => userPet.id === pet.id)
    );

    // pets recommended for the current user
    const recommendations = await getRecommendationsForUser(userId);

    // // if recommended pets -> move them in the beginning of the array
    if (recommendations && recommendations.pets.length) {
      const idToScoreMap = recommendations.pets.reduce((map, obj) => {
        map[obj.petId] = obj.score;
        return map;
      }, {});

      const sortedByRecommendation = filteredPets
        .map((pet) => ({
          ...pet.toObject(),
          id: pet.toObject()._id,
          score: idToScoreMap[pet._id] || 0, // Use 0 as the default score if id is not found
        }))
        .sort((petA, petB) => petB.score - petA.score);
      res.send(sortedByRecommendation);
      return;
    }
    res.send(filteredPets);
    return;
  }

  res.send(activePets);
});

export { router as queryPetRouter };
