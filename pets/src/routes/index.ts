import express, { Request, Response } from "express";
import { petProjection } from "../pet-projection";
import getAllPets from "../db-requests/get-all-pets";
import getAllActivePets from "../db-requests/get-all-active-pets";
import getPetsByUser from "../db-requests/get-pets-by-user";
import getRecommendationsForUser from "../db-requests/get-recommendations-for-user";
import { currentUser } from "@giveapaw/common";

const router = express.Router();

router.get("/api/pets", currentUser, async (req: Request, res: Response) => {
  const { limit } = req.query;
  const enhancedProjection = { ...petProjection, userId: 1 };
  const limitAsInt = parseInt(limit as string, 10);

  if (req.currentUser?.role === "admin") {
    const allPets = await getAllPets(limitAsInt, enhancedProjection);
    return res.send(allPets);
  }

  const activePets = await getAllActivePets(enhancedProjection);

  //logged user
  if (req.currentUser?.id) {
    const userId = req.currentUser?.id;
    const userPets = await getPetsByUser(
      userId,
      limitAsInt,
      enhancedProjection
    );

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
      res.send(sortedByRecommendation.slice(0, limitAsInt));
      return;
    }
    res.send(filteredPets.slice(0, limitAsInt));
    return;
  }

  res.send(activePets.slice(0, limitAsInt));
});

export { router as indexPetRouter };
