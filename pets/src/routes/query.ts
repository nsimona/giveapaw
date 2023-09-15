import express, { Request, Response } from "express";
import { Pet } from "../models/pet";
import { isArrayOfValidMongoIds } from "../utils";
import { BadRequestError, requireAuth } from "@giveapaw/common";

const router = express.Router();

router.get(
  "/api/pets/query",
  requireAuth,
  async (req: Request, res: Response) => {
    // userId == query by user id, e.g. retrun all pets owned by userId
    const { userId, type, size, breed, age, ids } = req.query;
    const queryParam = userId || ids;

    if (queryParam === "undefined") {
      throw new BadRequestError("no query parameter provided");
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

    const pets = await Pet.find(
      { userId },
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
  }
);

export { router as queryPetRouter };
