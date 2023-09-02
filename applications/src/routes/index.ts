import { currentUser, requireAuth } from "@giveapaw/common";
import express, { Request, Response } from "express";
import { Application } from "../models/application";

const router = express.Router();

router.get(
  "/api/applications",
  requireAuth,
  async (req: Request, res: Response) => {
    const applications = await Application.find({
      userId: req.currentUser!.id,
    }).populate("pet");

    res.send(applications);
  }
);

export { router as indexApplicationRouter };
