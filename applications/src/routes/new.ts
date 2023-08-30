import mongoose from "mongoose";
import { requireAuth, validateRequest } from "@giveapaw/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/api/orders",
  requireAuth,
  [
    body("petId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("valid petId must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    if (validateRequest) res.send({});
  }
);

export { router as newOrderRouter };
