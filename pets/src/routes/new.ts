import { requireAuth, validateRequest } from "@giveapaw/common";
import { body } from "express-validator";
import express, { Request, Response, Express } from "express";
import { Pet } from "../models/pet";
import { PetCreatedPublisher } from "../events/publisher/pet-created-publisher";
import { natsWrapper } from "../nats-wrapper";
import { PetStatus } from "../pet-status-enum";
import multer, { Multer } from "multer";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

// Create a Multer instance with explicit types
const storage = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ) => {
    // Define the destination directory for storing files
    callback(null, "uploads/");
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ) => {
    // Define the filename for the uploaded file
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post(
  "/api/pets",
  requireAuth,
  upload.array("selectedFiles", 5), // 5 is the maximum number of files
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
      selectedCoverIndex = 0,
    } = req.body;

    const filesMetadataArray = selectedFiles.map((file: any) => ({
      name: file.name,
      url: `/uploads/${file.name}`, // Adjust the URL as needed
    }));

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
      selectedFiles: filesMetadataArray,
      selectedCoverIndex,
      status: PetStatus.Pending,
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
      // status: "pending",
    });

    res.status(201).send(pet);
  }
);

export { router as createPetRouter };
