import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { PetStatus } from "../pet-status-enum";

interface PetAttrs {
  // basic
  name: string;
  type: string;
  age: number;
  breed: string;
  gender: string;
  color: string;
  size: string;
  userId: string;
  // additional
  description: string;
  trained: boolean;
  livedInAHouse: string[]; // with kids, without pets etc
  healthState: string[];
  goodWith: string[]; // pets, kids etc
  characteristics: string[]; // with a yard, without pets etc.
  // photos
  selectedFiles: string[];
  selectedCoverIndex: number;
  status: PetStatus;
}

interface PetDoc extends mongoose.Document {
  name: string;
  type: string;
  userId: string;
  age: number;
  breed: string;
  gender: string;
  color: string;
  size: string;
  // additional
  description: string;
  trained: boolean;
  livedInAHouse: [string]; // with kids, without pets etc
  healthState: [string];
  goodWith: [string]; // pets, kids etc
  characteristics: [string]; // with a yard, without pets etc.
  // photos
  selectedFiles: [any];
  selectedCoverIndex: number;
  // version
  version: number;
  // applciation
  applicationId?: string;
  status: PetStatus;
}

interface PetModel extends mongoose.Model<PetDoc> {
  build(attr: PetAttrs): PetDoc;
}

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: false,
    },
    breed: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    trained: {
      type: Boolean,
      required: false,
    },
    livedInAHouse: {
      type: [String],
      required: false,
    },
    healthState: {
      type: [String],
      required: false,
    },
    goodWith: {
      type: [String],
      required: false,
    },
    characteristics: {
      type: [String],
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    // photos
    selectedFiles: {
      type: [],
      required: false,
    },
    selectedCoverIndex: {
      type: Number,
      required: false,
    },
    // application
    applicationId: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(PetStatus),
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

petSchema.set("versionKey", "version");
petSchema.plugin(updateIfCurrentPlugin);

petSchema.statics.build = (attrs: PetAttrs) => {
  return new Pet(attrs);
};

const Pet = mongoose.model<PetDoc, PetModel>("Pet", petSchema);

export { Pet };
