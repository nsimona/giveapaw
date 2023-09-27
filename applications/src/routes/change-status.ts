import {
  ApplicationStatus,
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "@giveapaw/common";
import express, { Request, Response } from "express";
import { Application } from "../models/application";
import { ApplicationCancelledPublisher } from "../events/publishers/application-cancelled-publisher";
import { natsWrapper } from "../nats-wrapper";

function isStatusValid(status: any): status is ApplicationStatus {
  return (
    status === ApplicationStatus.Approved ||
    status === ApplicationStatus.Declined
  );
}

const router = express.Router();

router.patch("/api/applications", async (req: Request, res: Response) => {
  const { applicationId, status } = req.body;

  const application = await Application.findById(applicationId).populate("pet");
  if (!application) {
    throw new NotFoundError();
  }
  if (application.pet.ownerId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }
  if (!isStatusValid(status)) {
    throw new BadRequestError("You can only approve or decline an application");
  }
  application.status = status;
  // if status eq approved => decline all exisiting
  // tell nats that this happened
  await application.save();

  new ApplicationCancelledPublisher(natsWrapper.client).publish({
    id: application.id,
    userId: application.id,
    version: application.version,
    // status: application.status,
    pet: {
      id: application.pet.id,
      name: application.pet.name,
      type: application.pet.type,
    },
  });
  res.status(204).send(application);
});

export { router as changeStatusApplciationRouter };
