import { Pet } from "../models/pet";
import { petProjection } from "../pet-projection";

const getAllActivePets = async (
  limit?: number,
  projection: Record<string, number> = petProjection,
  requestQuery?: any
) => {
  let query = Pet.find({}, projection);
  if (limit) {
    query = query.limit(limit);
  }
  if (requestQuery) {
    let queryPets = await Pet.find(
      {
        ...requestQuery,
        status: "active",
      },
      petProjection
    );
    return queryPets;
  }
  const pets = await query.exec();
  const activePets = pets.filter((pet) => pet.status === "active");
  return activePets;
};

export default getAllActivePets;
