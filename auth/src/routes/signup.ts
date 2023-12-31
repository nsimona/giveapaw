import express, { Request, Response } from "express";
import { sign as jwtSign } from "jsonwebtoken";

import { body } from "express-validator";
import { User } from "../models/user";
import { BadRequestError, validateRequest } from "@giveapaw/common";
const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      email,
      password,
      firstName,
      lastName,
      city = null,
      address = null,
      zipCode = null,
      favorites = [],
      firstTimeOwner = null,
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("Email already exists");
      throw new BadRequestError("Email in use");
    }

    const user = User.build({
      email,
      password,
      role: "user",
      firstName,
      lastName,
      city,
      address,
      zipCode,
      favorites,
      firstTimeOwner,
      preferences: {
        type: "",
        age: "",
        size: "",
        color: "",
        gender: "",
        trained: "",
        livedInAHouse: [],
        goodWith: [],
        houseConditions: [],
        characteristics: [],
      },
    });
    await user.save();

    // generate JWT
    const userJwt = jwtSign(
      {
        id: user.id,
        email: user.email,
        role: "user",
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
