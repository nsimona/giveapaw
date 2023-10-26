import { natsWrapper } from "../nats-wrapper";
import { RecommendationsGeneratedPublisher } from "../events/publishers/recommendations-genereated-publisher";
import { client } from "../index";
import { calculateMatch } from "./calculate-match";
import { generalWeights } from "./weights";

const limit = 20;

const updateRecommendations = async () => {
  console.log("updating recommendations");
  try {
    const userKeys = await client.keys("preference:*");

    for (const userKey of userKeys) {
      const userId = userKey.replace("preference:", "");
      const preferences = await client.get(userKey);
      if (!preferences) {
        console.error("no preferences found for user", userId);
        continue;
      }

      const petKeys = await client.keys("pet:*");

      const petPromises = petKeys.map(async (petKey) => {
        const pet = await client.get(petKey);
        if (!pet) {
          console.error("no pet", petKey);
          return null;
        }
        return JSON.parse(pet);
      });

      const petData = await Promise.all(petPromises);

      const newRecommendations = petData
        .map((normalizePet) => ({
          petId: normalizePet.id,
          score: calculateMatch(
            normalizePet,
            JSON.parse(preferences),
            generalWeights
          ).score,
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);

      const previousRecommendations = await client.get(
        `recommendations:${userId}`
      );

      if (JSON.stringify(newRecommendations) !== previousRecommendations) {
        await client.set(
          `recommendations:${userId}`,
          JSON.stringify(newRecommendations)
        );
        new RecommendationsGeneratedPublisher(natsWrapper.client).publish({
          userId,
          pets: newRecommendations,
        });
      }
    }
  } catch (error) {
    console.error("Error in updateRecommendations:", error);
  }
};

export default updateRecommendations;
