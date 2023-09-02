import {
  ApplicationStatus,
  NotAuthorizedError,
  NotFoundError,
} from "@giveapaw/common";
import express, { Request, Response } from "express";
import { Application } from "../models/application";

const router = express.Router();

router.delete(
  "/api/applications/:applicationId",
  async (req: Request, res: Response) => {
    const application = await Application.findById(req.params.applicationId);

    if (!application) {
      throw new NotFoundError();
    }
    if (application.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    application.status = ApplicationStatus.Cancelled;
    await application.save();

    // publishing an event saying this was cancelled!

    res.status(204).send(application);
  }
);

export { router as deleteApplciationRouter };
