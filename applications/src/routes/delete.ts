import {
  ApplicationStatus,
  NotAuthorizedError,
  NotFoundError,
} from "@giveapaw/common";
import express, { Request, Response } from "express";
import { Application } from "../models/application";
import { ApplicationCancelledPublisher } from "../events/application-cancelled-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.delete(
  "/api/applications/:applicationId",
  async (req: Request, res: Response) => {
    const application = await Application.findById(
      req.params.applicationId
    ).populate("pet");

    if (!application) {
      throw new NotFoundError();
    }
    if (application.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    application.status = ApplicationStatus.Cancelled;
    await application.save();

    new ApplicationCancelledPublisher(natsWrapper.client).publish({
      id: application.id,
      userId: application.id,
      pet: {
        id: application.pet.id,
        name: application.pet.name,
        type: application.pet.type,
      },
    });

    res.status(204).send(application);
  }
);

export { router as deleteApplciationRouter };
