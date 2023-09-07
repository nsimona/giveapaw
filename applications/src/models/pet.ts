import mongoose from "mongoose";
import { Application } from "./application";
import { ApplicationStatus } from "@giveapaw/common";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface PetAttrs {
  name: string;
  type: string;
  id: string;
}
export interface PetDoc extends mongoose.Document {
  type: string;
  name: string;
  version: number;
  isAdopted(): Promise<boolean>;
}
interface PetModel extends mongoose.Model<PetDoc> {
  build(attrs: PetAttrs): PetDoc;
  findByEvent(event: { id: string; version: number }): Promise<PetDoc | null>;
}

const petSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    name: {
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

petSchema.set("versionKey", "version");
petSchema.plugin(updateIfCurrentPlugin);

petSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return Pet.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};
petSchema.statics.build = (attrs: PetAttrs) => {
  return new Pet({
    _id: attrs.id,
    type: attrs.type,
    name: attrs.name,
  });
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
