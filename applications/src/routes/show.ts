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
    if (application.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    res.send(application);
  }
);

export { router as showApplicationRouter };
