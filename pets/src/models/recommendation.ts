import mongoose, { Schema } from "mongoose";
// import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface RecommendationAttrs {
  userId: string;
  pets: any[];
}

interface RecommendationDoc extends mongoose.Document {
  userId: string;
  pets: [any];
}

interface RecommendationModel extends mongoose.Model<RecommendationDoc> {
  build(attr: RecommendationAttrs): RecommendationDoc;
}

const recommedantionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    pets: {
      type: [Schema.Types.Mixed],
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

// recommedantionSchema.set("versionKey", "version");
// recommedantionSchema.plugin(updateIfCurrentPlugin);

recommedantionSchema.statics.build = (attrs: RecommendationAttrs) => {
  return new Recommendation(attrs);
};

const Recommendation = mongoose.model<RecommendationDoc, RecommendationModel>(
  "Recommendation",
  recommedantionSchema
);

export { Recommendation };
