// get pets by status
import express, { Request, Response } from "express";
import { Pet } from "../models/pet";
import { isArrayOfValidMongoIds } from "../utils";
import { BadRequestError, requireAdmin, requireAuth } from "@giveapaw/common";

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
    // const pets = await Pet.find(
    //   { status },
    //   {
    //     name: 1,
    //     breed: 1,
    //     age: 1,
    //     size: 1,
    //     gender: 1,
    //     // TODO add cover pic also
    //   }
    // );

    res.send([]);
  }
);

export { router as statusPetRouter };
