import {
  NotAuthorizedError,
  NotFoundError,
  currentUser,
  requireAuth,
} from "@giveapaw/common";
import express, { Request, Response } from "express";
import { Application } from "../models/application";
import { Pet } from "../models/pet";

const router = express.Router();

// return all applications for a specific pet
router.get(
  "/api/applications/pet/:petId",
  requireAuth,
  async (req: Request, res: Response) => {
    const { petId } = req.params;
    const pet = await Pet.findOne({
      _id: petId,
    });

    if (!pet) {
      throw new NotFoundError();
    }

    if (req.currentUser!.id !== pet.ownerId) {
      throw new NotAuthorizedError();
    }

    const application = await Application.find(
      {
        pet: {
          _id: petId,
        },
      },
      {
        // candidateName: 1,
        // candaidateCity: 1,
        createdAt: 1,
        status: 1,
        id: 1,
      }
    ).populate("pet");

    res.send(application);
  }
);

export { router as petApplicationsRouter };
