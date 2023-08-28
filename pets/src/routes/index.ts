import express, { Request, Response } from "express";
import { Pet } from "../models/pet";

const router = express.Router();

router.get("/api/pets", async (req: Request, res: Response) => {
  const pets = await Pet.find({});

  res.send(pets);
});

export { router as indexPetRouter };
