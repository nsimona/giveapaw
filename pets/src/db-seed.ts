import { pets } from "@giveapaw/common";
import { Pet } from "./models/pet";
import { natsWrapper } from "./nats-wrapper";
import { PetStatus } from "./pet-status-enum";
import { PetCreatedPublisher } from "./events/publisher/pet-created-publisher";

// Main function to fill MongoDB collection with dummy data
export const dbSeed = async () => {
  try {
    for (const pet of pets) {
      const existingPet = await Pet.findById(pet.id);
      if (existingPet) continue;
      await Pet.build({ ...pet, status: PetStatus.Active }).save();
      console.log("Default pet added to the db ", pet.id, "-", pet.name);

      new PetCreatedPublisher(natsWrapper.client).publish(pet);
      console.log("Emmited a pet:created event for ", pet.id);
    }
  } catch (err) {
    console.error(err);
  }
};
