import mongoose, { mongo } from "mongoose";

interface ApplicationAttrs {
  userId: string;
  status: ApplicationStatus;
  expiresAt: Date;
  message: string;
  pet: PetDoc;
}
interface ApplicationDoc extends mongoose.Document {
  userId: string;
  status: string;
  expiresAt: Date;
  message: string;
  pet: PetDoc;
}
interface ApplicationModel extends mongoose.Model<ApplicationDoc> {
  build(attrs: ApplicationAttrs): ApplicationDoc;
}

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
      required: false,
    },
    message: {
      type: String,
      required: false,
    },
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
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

applicationSchema.statics.build = (attrs: ApplicationAttrs) => {
  return new Application(attrs);
};
const Application = mongoose.model<ApplicationDoc, ApplicationModel>(
  "Application",
  applicationSchema
);

export { Application };