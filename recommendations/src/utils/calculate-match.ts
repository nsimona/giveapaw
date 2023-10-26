import { FeatureWeights, Features } from "./types";

export const calculateMatch = (
  pet: Features,
  preferences: Features,
  weights: FeatureWeights
): { score: number; matchedFeatures: Record<string, any> } => {
  const matchedFeatures: Record<string, any> = {};

  let totalWeight = 0;
  let totalScore = 0;

  // filter out null undefined or empty preferences - means they are not set
  const validPreferences = Object.keys(preferences).filter((feature) => {
    const preference = preferences[feature as keyof Features];
    if (Array.isArray(preference)) {
      return preference.length > 0;
    }
    return (
      preference !== null &&
      preference !== undefined &&
      preference !== "" &&
      // need to remove these from the db when consuming the events
      feature !== "version" &&
      feature !== "userId"
    );
  });

  for (const feature of validPreferences) {
    const petValue = pet[feature as keyof Features];
    const prefValue = preferences[feature as keyof Features];
    const weightsValue = weights[feature as keyof Features];

    if (prefValue === "noPreference") {
      totalScore += weightsValue;
      totalWeight += weightsValue;
      continue;
    }

    if (Array.isArray(petValue) && Array.isArray(prefValue)) {
      const intersection = petValue.filter((value) =>
        prefValue.includes(value)
      );
      if (intersection.length > 0) {
        matchedFeatures[feature] = intersection;
        totalScore += (intersection.length / prefValue.length) * weightsValue;
        totalWeight += weightsValue; // Add to total weight only if there's an intersection
      }
    } else if (petValue == prefValue) {
      matchedFeatures[feature] = prefValue;
      totalScore += weightsValue;
    }
    totalWeight += weightsValue;
  }

  const normalizedScore = totalWeight > 0 ? totalScore / totalWeight : 0;
  const score = (normalizedScore * 100) | 0;

  return { score, matchedFeatures };
};
