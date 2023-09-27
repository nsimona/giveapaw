import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@giveapaw/common";
import express, { Request, Response } from "express";
import { Application } from "../models/application";

const router = express.Router();

router.get(
  "/api/applications/:applicationId",
  requireAuth,
  async (req: Request, res: Response) => {
    const application = await Application.findById(
      req.params.applicationId
    ).populate("pet");
    if (!application) {
      throw new NotFoundError();
    }

    // the application is accessible only for the owner of the pet and for the creator of the application
    if (
      req.currentUser!.id !== application.userId &&
      req.currentUser!.id !== application.pet.ownerId
    ) {
      throw new NotAuthorizedError();
    }
    res.send(application);
  }
);

export { router as showApplicationRouter };
