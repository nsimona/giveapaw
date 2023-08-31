import mongoose from "mongoose";
import { Application } from "./application";
import { ApplicationStatus } from "@giveapaw/common";

interface PetAttrs {
  type: string;
  breed: string;
}
export interface PetDoc extends mongoose.Document {
  type: string;
  breed: string;
  isAdopted(): Promise<boolean>;
}
interface PetModel extends mongoose.Model<PetDoc> {
  build(attrs: PetAttrs): PetDoc;
}

const petSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
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

petSchema.statics.build = (attrs: PetAttrs) => {
  return new Pet(attrs);
};
petSchema.methods.isAdopted = async function () {
  const exisitingApprovedApplication = await Application.findOne({
    pet: this,
    status: {
      $in: [ApplicationStatus.Approved],
    },
  });
  return !!exisitingApprovedApplication;
};

const Pet = mongoose.model<PetDoc, PetModel>("Pet", petSchema);

export { Pet };
