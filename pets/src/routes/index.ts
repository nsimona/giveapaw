import express, { Request, Response } from "express";
import { Pet } from "../models/pet";
import { isArrayOfValidMongoIds } from "../utils";
import { BadRequestError } from "@giveapaw/common";

const router = express.Router();

router.get("/api/pets", async (req: Request, res: Response) => {
  const { ids } = req.query;

  if (ids) {
    // if (!isArrayOfValidMongoIds(ids)) {
    //   throw new BadRequestError("Invalid id provided");
    // }

    const pets = await Pet.find({ _id: { $in: ids } });
    res.send(pets);
    return;
  }

  const pets = await Pet.find(
    {},
    {
      name: 1,
      breed: 1,
      age: 1,
      size: 1,
      gender: 1,
      // TODO add cover pic also
    }
  );

  res.send(pets);
});

export { router as indexPetRouter };
