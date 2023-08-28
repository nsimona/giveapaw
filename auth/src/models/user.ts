import mongoose from "mongoose";
import { PasswordManager } from "../services/passwordManager";

// describes the properties that are required to create a user
interface RequiredUserAttrs {
  email: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
}

interface UserAttrs extends RequiredUserAttrs {
  // user related
  city: string;
  address: string;
  zipCode: string;
  favs: number[]; // ids of the fav pets
  // basic pet preferences
  firstTimeOwner: boolean;
  preferredPetType: string;
  preferredPetAge: number;
  preferredPetBreed: string;
  preferredPetSize: string;
  preferredPetColor: string;
  // additional pet preferences
  preferredPetIsTrained: string; // search for a trained/no trained pet, no preferences
  preferredPetLivedInAHouse: string[]; // with kids, without pets etc
  preferredPetGoodWith: string[]; // pets, kids etc
  preferredPetHouseConditions: string[]; // with a yard, without pets etc.
}

// describes the properties that a User Model has
interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): UserDoc;
}

// describes the properties that a User Document has
interface UserDoc extends mongoose.Document {
  // user
  email: string;
  password: string;
  role: string;
  // user profile
  firstName: string;
  lastName: string;
  city: string;
  address: string;
  zipCode: string;
  favs: [number];
  // user preferences
  firstTimeOwner: boolean;
  preferredPetType: string;
  preferredPetAge: number;
  preferredPetBreed: string;
  preferredPetSize: string;
  preferredPetColor: string;
  preferredPetIsTrained: string;
  preferredPetLivedInAHouse: [string];
  preferredPetGoodWith: [string];
  preferredPetHouseConditions: [string];
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    zipCode: {
      type: String,
      required: false,
    },
    favs: {
      type: [Number],
      required: false,
    },
    firstTimeOwner: { type: String, required: false },
    preferredPetType: { type: String, required: false },
    preferredPetAge: { type: Number, required: false },
    preferredPetBreed: { type: String, required: false },
    preferredPetSize: { type: String, required: false },
    preferredPetColor: { type: String, required: false },
    preferredPetIsTrained: { type: String, required: false },
    preferredPetLivedInAHouse: { type: [String], required: false },
    preferredPetGoodWith: { type: [String], required: false },
    preferredPetHouseConditions: { type: [String], required: false },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await PasswordManager.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
