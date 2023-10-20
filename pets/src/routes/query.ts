import express, { Request, Response } from "express";
import { Pet } from "../models/pet";
import { isArrayOfValidMongoIds } from "../utils";
import { BadRequestError } from "@giveapaw/common";
import { petProjection } from "../pet-projection";

const router = express.Router();

router.get("/api/pets/query", async (req: Request, res: Response) => {
  const { ids } = req.query;

  if (Object.keys(req.query).length === 0) {
    const allPets = await Pet.find({}, petProjection);
    res.send(allPets);
    return;
  }

  // handle query pets by their ids
  if (ids !== undefined) {
    if (ids === "") {
      res.send([]);
      return;
    }
    const parseIds = ids.toString().split(",");

    if (!isArrayOfValidMongoIds(parseIds)) {
      throw new BadRequestError("Invalid id provided");
    }

    const pets = await Pet.find({ _id: { $in: parseIds } });
    res.send(pets);
    return;
  }

  const pets = await Pet.find(req.query, petProjection);

  res.send(pets);
});

export { router as queryPetRouter };
