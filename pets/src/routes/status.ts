// get pets by status
import express, { Request, Response } from "express";
import { Pet } from "../models/pet";
// import { isArrayOfValidMongoIds } from "../utils";
import {
  BadRequestError,
  NotAuthorizedError,
  requireAdmin,
  requireAuth,
} from "@giveapaw/common";
import { petProjection } from "../pet-projection";

const router = express.Router();

router.get(
  "/api/pets/status/:status",
  requireAuth,
  requireAdmin,
  async (req: Request, res: Response) => {
    const { status } = req.params;
    if (!status) {
      throw new BadRequestError("no status provided");
    }
    const pets = await Pet.find({ status }, petProjection);
    res.send(pets);
  }
);

export { router as statusPetRouter };
