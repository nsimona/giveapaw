import express, { Request, Response } from "express";
import { Pet } from "../models/pet";
import { NotFoundError } from "@giveapaw/common";

const router = express.Router();

router.get("/api/pets/:id", async (req: Request, res: Response) => {
  const pet = await Pet.findById(req.params.id);

  if (!pet) {
    throw new NotFoundError();
  }

  res.send(pet);
});

export { router as showPetRouter };
