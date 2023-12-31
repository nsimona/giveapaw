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

interface UserPreferences {
  type: string;
  age: string;
  size: string;
  color: string;
  gender: string;
  trained: string;
  livedInAHouse: string[];
  goodWith: string[];
  houseConditions: string[];
  characteristics: string[];
}

interface UserAttrs extends RequiredUserAttrs {
  // user related
  city: string;
  address: string;
  zipCode: string;
  favorites: string[];
  firstTimeOwner: string;
  preferences: UserPreferences;
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
  favorites: [string];
  // user preferences
  preferences: {
    firstTimeOwner: string;
    type: string;
    age: string;
    size: string;
    gender: string;
    color: string;
    trained: string;
    livedInAHouse: [string];
    goodWith: [string];
    houseConditions: [string];
    characteristics: [string];
  };
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
    favorites: {
      type: [String],
      required: false,
    },
    preferences: {
      type: Object,
      required: false,
    },
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
