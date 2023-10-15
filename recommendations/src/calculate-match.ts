export interface Features {
  // features
  type: string;
  age: number;
  breed: string;
  gender: string;
  color: string;
  size: string;
  trained: boolean;
  livedInAHouse: string[] | null;
  healthState: string[] | null;
  goodWith: string[] | null;
  characteristics: string[] | null;
}

type FeatureWeights = {
  [Key in keyof Features]: number;
};

export const preferences: Features = {
  type: "Dog",
  age: 3,
  breed: "Husky",
  gender: "Female",
  color: "Grey",
  size: "Large",
  trained: true,
  livedInAHouse: null,
  healthState: null,
  goodWith: null,
  characteristics: null,
};

export const preferences2: Features = {
  type: "Cat",
  age: 3,
  breed: "Husky",
  gender: "Female",
  color: "Grey",
  size: "Large",
  trained: true,
  livedInAHouse: null,
  healthState: null,
  goodWith: null,
  characteristics: null,
};

export const pet: Features = {
  type: "Dog",
  age: 4,
  breed: "Husky",
  gender: "Female",
  color: "Grey",
  size: "Large",
  trained: true,
  livedInAHouse: ["With Yard"],
  healthState: ["Good"],
  goodWith: ["Children", "Travel"],
  characteristics: ["Independent"],
};

export const pet2: Features = {
  type: "Dog",
  age: 3,
  breed: "Unknown",
  gender: "Female",
  color: "Grey",
  size: "Large",
  trained: true,
  livedInAHouse: ["With Yard"],
  healthState: ["Good"],
  goodWith: ["Children", "Travel"],
  characteristics: ["Independent"],
};

export const pet3: Features = {
  type: "Cat",
  age: 3,
  breed: "Unknown",
  gender: "Female",
  color: "Grey",
  size: "Large",
  trained: true,
  livedInAHouse: ["With Yard"],
  healthState: ["Good"],
  goodWith: ["Children", "Travel"],
  characteristics: ["Independent"],
};

// 50 in total
export const weights: FeatureWeights = {
  type: 10,
  breed: 7,
  gender: 6,
  size: 6,
  age: 5,
  color: 2,
  trained: 2,
  livedInAHouse: 1,
  healthState: 1,
  goodWith: 1,
  characteristics: 1,
};

export const calculateMatch = (
  pet: Features,
  preferences: Features,
  weights: FeatureWeights
): { score: number; matchedFeatures: Record<string, any> } => {
  const matchedFeatures: Record<string, any> = {};

  let totalWeight = 0;
  let totalScore = 0;

  // Filter out null or undefined preferences
  const validPreferences = Object.keys(preferences).filter(
    (feature) =>
      preferences[feature as keyof Features] !== null &&
      preferences[feature as keyof Features] !== undefined
  );

  for (const feature of validPreferences) {
    const petValue = pet[feature as keyof Features];
    const prefValue = preferences[feature as keyof Features];
    const weightsValue = weights[feature as keyof Features];

    if (Array.isArray(petValue) && Array.isArray(prefValue)) {
      const intersection = petValue.filter((value) =>
        prefValue.includes(value)
      );
      if (intersection.length > 0) {
        matchedFeatures[feature] = intersection;
        totalScore += (intersection.length / prefValue.length) * weightsValue;
        totalWeight += weightsValue; // Add to total weight only if there's an intersection
      }
    } else if (petValue === prefValue) {
      matchedFeatures[feature] = petValue;
      totalScore += weightsValue;
      totalWeight += weightsValue; // Add to total weight if there's an exact match
    }
  }

  const normalizedScore = totalWeight > 0 ? totalScore / totalWeight : 0;

  return { score: (normalizedScore * 100) | 0, matchedFeatures };
};

const matchResult = calculateMatch(pet, preferences, weights);

export { matchResult };

// console.log(`Score: ${matchResult.score}/100`);
// console.log("Matched Preferences:", matchResult.matchedFeatures);
