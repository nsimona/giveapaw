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
  version: number;
  userId: string;
}

export type FeatureWeights = {
  [Key in keyof Features]: number;
};
