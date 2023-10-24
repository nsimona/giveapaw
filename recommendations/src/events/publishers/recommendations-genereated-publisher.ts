import {
  RecommendationsGenerated,
  Publisher,
  Subjects,
} from "@giveapaw/common";

export class RecommendationsGeneratedPublisher extends Publisher<RecommendationsGenerated> {
  readonly subject = Subjects.RecommendationsGenerated;
}
