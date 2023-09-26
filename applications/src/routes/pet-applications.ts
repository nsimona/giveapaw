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

// return all applications made by the user
router.get(
  "/api/applications/pet/:petId",
  requireAuth,
  async (req: Request, res: Response) => {
    const { petId } = req.params;
    // const pet = await Pet.findOne({
    //   _id: petId,
    // });

    // if (!pet) {
    //   console.log("pet not found");
    //   throw new NotFoundError();
    // }

    // if (req.currentUser!.id !== pet.ownerId) {
    //   throw new NotAuthorizedError();
    // }

    // const applications = await Application.find({
    //   //   userId: req.currentUser!.id,
    //   pet: {
    //     ownerId: req.currentUser!.id,
    //   },
    // }).populate("pet");

    // res.send(applications);
  }
);

export { router as petApplicationsRouter };
