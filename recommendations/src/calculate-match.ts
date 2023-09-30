interface Pet {
  type: string;
  age: number;
  breed: string;
  gender: string;
  color: string;
  size: string;
  trained: boolean;
  livedInAHouse: string[];
  healthState: string[];
  goodWith: string[];
  characteristics: string[];
}

interface Preferences {
  preferredPetType: string;
  preferredPetAge: number;
  preferredPetBreed: string;
  preferredPetSize: string;
  preferredPetColor: string;
  preferredPetIsTrained: boolean | null;
  preferredPetLivedInAHouse: string[];
  preferredPetGoodWith: string[];
  preferredPetGender: string;
  prefferedPetCharacteristics: string[];
}

// Sample user preferences
const userPreferences: Preferences = {
  preferredPetType: "Dog",
  preferredPetAge: 3,
  preferredPetBreed: "Husky",
  preferredPetGender: "Female",
  preferredPetSize: "Large",
  preferredPetColor: "Grey",
  preferredPetIsTrained: null,
  preferredPetLivedInAHouse: ["With Yard"],
  preferredPetGoodWith: ["Children"],
  prefferedPetCharacteristics: ["No Allergies"],
};

// Sample pet data
const pet: Pet = {
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

// Define a custom return type for calculateMatch
type MatchResult = {
  score: number;
  matchedFeatures: Record<string, any>;
  // unknownPreferences: Record<string, any>;
};

const mapFeatures: any = {
  type: "preferredPetType",
  age: "preferredPetAge",
  breed: "preferredPetBreed",
  size: "preferredPetSize",
  color: "preferredPetColor",
  gender: "preferredPetGender",
  trained: "preferredPetIsTrained",
  livedInAHouse: "preferredPetLivedInAHouse",
  goodWith: "preferredPetGoodWith",
  characteristics: "prefferedPetCharacteristics",
};

const weights: Record<string, number> = {
  preferredPetType: 10, // Higher weight for type
  preferredPetBreed: 7, // Higher weight for breed
  preferredPetAge: 6, // Higher weight for age
  preferredPetGender: 6, // Higher weight for size
  preferredPetSize: 5, // Higher weight for size
  preferredPetColor: 2, // Higher weight for color
  preferredPetIsTrained: 1,
  preferredPetLivedInAHouse: 1,
  preferredPetGoodWith: 1,
  prefferedPetCharacteristics: 1,
  // preferredPetHouseConditions: 1,
};

// Function to calculate the match score based on preferences
const calculateMatch = (pet: Pet, preferences: Preferences): MatchResult => {
  const matchedFeatures: Record<string, any> = {};

  let totalWeight = 0;
  let totalScore = 0;

  Object.keys(mapFeatures).forEach((featureKey) => {
    const preferenceKey = mapFeatures[featureKey];
    const petValue = pet[featureKey as keyof Pet];
    const prefValue = preferences[preferenceKey as keyof Preferences];

    if (prefValue === null) {
      // Skip preferences with null values
      return;
    }

    if (Array.isArray(petValue) && Array.isArray(prefValue)) {
      const intersection = petValue.filter((value) =>
        prefValue.includes(value)
      );
      if (intersection.length > 0) {
        matchedFeatures[preferenceKey] = intersection;
        totalScore +=
          (intersection.length / prefValue.length) * weights[preferenceKey];
      }
    } else if (petValue === prefValue) {
      matchedFeatures[preferenceKey] = petValue;
      totalScore += weights[preferenceKey];
    }

    totalWeight += weights[preferenceKey];
  });

  const normalizedScore = totalWeight > 0 ? totalScore / totalWeight : 0;

  return { score: (normalizedScore * 100) | 0, matchedFeatures };
};

// Calculate the match score and preferences for the pet and user preferences
const matchResult = calculateMatch(pet, userPreferences);

console.log(`Score: ${matchResult.score}/100`);
console.log("Matched Preferences:", matchResult.matchedFeatures);
