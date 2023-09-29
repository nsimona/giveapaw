import { PetStatus } from "../pet-status-enum";
import express, { Request, Response } from "express";
import {
  BadRequestError,
  NotFoundError,
  requireAdmin,
  requireAuth,
} from "@giveapaw/common";
import { Pet } from "../models/pet";

function isStatusValid(status: any): status is PetStatus {
  return (
    status === PetStatus.Active ||
    status === PetStatus.Archived ||
    status === PetStatus.Declined
  );
}

const router = express.Router();

router.patch(
  "/api/pets/status",
  requireAuth,
  requireAdmin,
  async (req: Request, res: Response) => {
    const { petId, status, message } = req.body;
    const pet = await Pet.findById(petId);
    if (!pet) {
      throw new NotFoundError();
    }
    if (!isStatusValid(status)) {
      throw new BadRequestError("You can only activate or archive a pet");
    }

    const updatedPet = await Pet.findByIdAndUpdate(
      petId,
      { $set: { status } },
      { new: true }
    );

    // tell nats that this happened
    res.status(200).send(updatedPet);
  }
);

export { router as changeStatusPetRouter };
