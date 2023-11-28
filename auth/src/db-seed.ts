import mongoose from "mongoose";
import { admins, users } from "./dummy-data";
import { User } from "./models/user";

// Main function to fill MongoDB collection with dummy data
export const dbSeed = async () => {
  try {
    const dummyData = [...admins, ...users];
    // Insert dummy data into the collection
    for (let i = 0; i < dummyData.length; i++) {
      const existingUser = await User.findOne({ email: dummyData[i].email });
      if (existingUser) continue;
      await User.build(dummyData[i]).save();
    }

    console.log("Dumtm data filled to the db");
  } catch (err) {
    console.error(err);
  }
};
