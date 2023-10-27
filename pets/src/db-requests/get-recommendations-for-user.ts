import { Recommendation } from "../models/recommendation";

const getRecommendationsForUser = async (userId: string) => {
  const recommendations = await Recommendation.findOne({
    userId,
  });
  return recommendations;
};

export default getRecommendationsForUser;
