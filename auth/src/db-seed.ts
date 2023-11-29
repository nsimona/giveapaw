import { users } from "@giveapaw/common";
import { User } from "./models/user";
import { UserPreferencesUpdatedPublisher } from "./events/publishers/user-preferences-updated-publisher";
import { natsWrapper } from "./nats-wrapper";

// Main function to fill MongoDB collection with dummy data
export const dbSeed = async () => {
  try {
    for (let i = 0; i < users.length; i++) {
      const p = users[i].preferences;
      const existingUser = await User.findOne({ email: users[i].email });
      if (existingUser) continue;
      await User.build(users[i]).save();
      console.log("Default user added to the db ", users[i].id);
      new UserPreferencesUpdatedPublisher(natsWrapper.client).publish({
        type: p.type,
        age: p.age,
        size: p.size,
        color: p.color,
        gender: p.gender,
        trained: p.trained,
        livedInAHouse: p.livedInAHouse,
        goodWith: p.goodWith,
        houseConditions: p.houseConditions,
        characteristics: p.characteristics,
        userId: users[i].id,
        version: 1,
      });
      console.log("Emmited a preferences:updated event for ", users[i].id);
    }
  } catch (err) {
    console.error(err);
  }
};
