import { Pet } from "../models/pet";
import { petProjection } from "../pet-projection";

const getPetsByUser = async (
  userId: string,
  limit?: number,
  projection: Record<string, number> = petProjection
) => {
  let query = Pet.find({ userId }, projection);
  if (limit) {
    query = query.limit(limit);
  }
  const pets = await query.exec();
  return pets;
};

export default getPetsByUser;
