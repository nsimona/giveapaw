import { Types } from "mongoose";
import { Request, Response } from "express";
import { Recommendation } from "./models/recommendation";
import { Pet } from "./models/pet";
import { petProjection } from "./pet-projection";

export function isArrayOfValidMongoIds(ids: string[]) {
  for (const id of ids) {
    return Types.ObjectId.isValid(id);
  }
}

const filterActivePets = (pets: any[]) => {
  return pets.filter((pet) => pet.status === "active");
};

const handlePetsWithRecommendations = async (req: Request, res: Response) => {
  try {
    const { limit } = req.query;
    let query = Pet.find({}, { ...petProjection, userId: 1 });

    if (req.currentUser?.role === "admin") {
      if (limit) {
        query = query.limit(parseInt(limit as string, 10));
      }
    } else if (limit) {
      query = query.limit(parseInt(limit as string, 10));
    }

    const queryPets = await query.exec();

    const recommendations = await Recommendation.findOne({
      userId: req.currentUser?.id,
    });

    if (!recommendations) {
      const filteredPets = filterActivePets(queryPets);
      return res.send(filteredPets);
    }

    const recommendationPets = recommendations.pets
      .map((recommendation) => {
        const pet = queryPets.find(
          (qPet) => qPet._id.toString() === recommendation.petId.toString()
        );

        if (pet) {
          return {
            ...pet.toObject(),
            id: pet._id,
            score: recommendation.score,
          };
        }
        return null;
      })
      .filter((pet) => pet !== null) as any[]; // Cast to array type

    const remainingPets = queryPets.filter(
      (qPet) =>
        !recommendationPets.some(
          (rPet) => rPet.id.toString() === qPet._id.toString()
        )
    );

    const sortedRecommendationPets = recommendationPets.sort(
      (petA, petB) => petB.score - petA.score
    );

    const filteredAndSortedPets = sortedRecommendationPets.concat(
      filterActivePets(remainingPets)
    );

    res.send(filteredAndSortedPets);
  } catch (error) {
    res.status(500).send("An error occurred.");
  }
};

export { handlePetsWithRecommendations };
