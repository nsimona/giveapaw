import { natsWrapper } from "../nats-wrapper";
import { RecommendationsGeneratedPublisher } from "../events/publishers/recommendations-genereated-publisher";
import { client } from "../index";
import { calculateMatch } from "./calculate-match";
import { generalWeights } from "./weights";

const limit = 10;

const generateRecommendations = async (userId: string) => {
 
  try {
    const preferences = await client.get(`preference:${userId}`);
    const petKeys = await client.keys("pet:*");

    if (!preferences) {
      console.error("no preferences found", userId);
      return;
    }

    const petPromises = petKeys.map(async (p) => {
      const pet = await client.get(p);
      if (!pet) {
        console.error("no pet", p);
        return null;
      }
      return JSON.parse(pet);
    });

    const petData = await Promise.all(petPromises);

    const recommendations = petData
      .map((normalizedPet) => ({
        petId: normalizedPet.id,
        score: calculateMatch(
          normalizedPet,
          JSON.parse(preferences),
          generalWeights
        ).score,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    await client.set(
      `recommendations:${userId}`,
      JSON.stringify(recommendations)
    );

    new RecommendationsGeneratedPublisher(natsWrapper.client).publish({
      userId,
      pets: recommendations,
    });

    return recommendations;
  } catch (error) {
    console.error("Error in generateRecommendations:", error);
    return [];
  }
};

export default generateRecommendations;
