import { petValueDict } from "../assets/pet-dict";

// pets
export const normalizePetEditorData = (data) => {
  return data.map((e) => e.value);
};

export const petDataAsString = (data) => {
  if (typeof data === "string") {
    return petValueDict[data] !== undefined ? petValueDict[data] : data;
  }
  if (Array.isArray(data)) {
    return data.map((e) => e.title).join(", ");
  }

  if (typeof data === "boolean") {
    return data.toString();
  }

  return data;
};
