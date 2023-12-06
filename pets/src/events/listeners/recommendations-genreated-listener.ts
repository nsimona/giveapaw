import { RecommendationsGenerated, Listener, Subjects } from "@giveapaw/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Recommendation } from "../../models/recommendation";

export class RecommendationsGeneratedListener extends Listener<RecommendationsGenerated> {
  subject: Subjects.RecommendationsGenerated =
    Subjects.RecommendationsGenerated;
  queueGroupName = queueGroupName;
  async onMessage(data: RecommendationsGenerated["data"], msg: Message) {
    const { userId, pets } = data;
    const recommendations = await Recommendation.findOne({ userId });
    if (!recommendations) {
      const recommendation = Recommendation.build({
        userId,
        pets,
      });
      await recommendation.save();
      msg.ack();
      return;
    }

    recommendations.set({ pets });
    await recommendations.save();
    msg.ack();
  }
}
