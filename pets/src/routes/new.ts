import { requireAuth, validateRequest } from "@giveapaw/common";
import { body } from "express-validator";
import express, { Request, Response } from "express";
import { Pet } from "../models/pet";
import { PetCreatedPublisher } from "../events/publisher/pet-created-publisher";
import { natsWrapper } from "../nats-wrapper";
// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 2 * 1024 * 1024, // 2MB in bytes
//   },
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith("image/")) {
//       cb(null, true);
//     } else {
//       cb(new Error("Invalid file type"));
//     }
//   },
// });

const router = express.Router();

router.post(
  "/api/pets",
  requireAuth,
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("type").not().isEmpty().withMessage("Type is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      name,
      type,
      age = null,
      breed,
      gender,
      color,
      size,
      trained = null,
      livedInAHouse = [],
      healthState = [],
      goodWith = [],
      characteristics = [],
      description = null,
      selectedFiles = [],
      selectedCoverIndex = null,
    } = req.body;

    // try {

    //   // Extract file paths from req.files
    //   const photos = selectedFiles.map((file) => file.path);

    //   await pet.save();

    //   // ... remaining code
    // } catch (error) {
    //   console.error("Error uploading files:", error);
    //   res.status(400).json({ error: error.message });
    // }

    const pet = Pet.build({
      name,
      type,
      userId: req.currentUser!.id,
      age,
      breed,
      gender,
      color,
      size,
      trained,
      livedInAHouse,
      healthState,
      goodWith,
      characteristics,
      description,
      selectedFiles,
      selectedCoverIndex,
      isActive: false,
    });
    await pet.save();

    new PetCreatedPublisher(natsWrapper.client).publish({
      id: pet.id,
      name,
      type,
      userId: pet.userId,
      age,
      breed,
      gender,
      color,
      size,
      trained,
      livedInAHouse,
      healthState,
      goodWith,
      characteristics,
      description,
      version: pet.version,
    });

    res.status(201).send(pet);
  }
);

export { router as createPetRouter };
