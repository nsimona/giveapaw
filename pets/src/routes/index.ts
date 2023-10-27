import express, { Request, Response } from "express";
import { petProjection } from "../pet-projection";
import getAllPets from "../db-requests/get-all-pets";
import getAllActivePets from "../db-requests/get-all-active-pets";
import getPetsByUser from "../db-requests/get-pets-by-user";
import getRecommendationsForUser from "../db-requests/get-recommendations-for-user";

const router = express.Router();

router.get("/api/pets", async (req: Request, res: Response) => {
  const { limit } = req.query;
  const enhancedProjection = { ...petProjection, userId: 1 };
  const limitAsInt = parseInt(limit as string, 10);

  if (req.currentUser?.role === "admin") {
    const allPets = await getAllPets(limitAsInt, enhancedProjection);
    return res.send(allPets);
  }

  const activePets = await getAllActivePets(limitAsInt, enhancedProjection);

  if (req.currentUser?.id) {
    const userId = req.currentUser?.id;
    // pets owned by the current user
    const userPets = await getPetsByUser(
      userId,
      limitAsInt,
      enhancedProjection
    );
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

export { router as indexPetRouter };
