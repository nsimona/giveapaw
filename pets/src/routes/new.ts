import { requireAuth, validateRequest } from "@giveapaw/common";
import { body } from "express-validator";
import express, { Request, Response, Express } from "express";
import { Pet } from "../models/pet";
import { PetCreatedPublisher } from "../events/publisher/pet-created-publisher";
import { natsWrapper } from "../nats-wrapper";
import { PetStatus } from "../pet-status-enum";
import multer, { Multer } from "multer";
import path from "path";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

// Create a Multer instance with explicit types
const storage = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ) => {
    callback(null, path.join(__dirname, "../uploads"));
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post(
  "/api/pets",
  requireAuth,
  upload.array("selectedFiles", 5),
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("type").not().isEmpty().withMessage("Type is required"),
    body("breed").not().isEmpty().withMessage("Breed is required"),
    body("gender").not().isEmpty().withMessage("Gender is required"),
    body("size").not().isEmpty().withMessage("Size is required"),
    body("age").not().isEmpty().withMessage("Age is required"),
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

    const files = req.files as Express.Multer.File[];
    const filesMetadataArray = files.map((file: Express.Multer.File) => ({
      name: file.originalname,
      url: `/uploads/${file.originalname}`, // Adjust the URL as needed
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
      livedInAHouse: livedInAHouse.length ? livedInAHouse.split(",") : [],
      healthState: healthState.length ? healthState.split(",") : [],
      goodWith: goodWith.length ? goodWith.split(",") : [],
      characteristics: characteristics.length ? characteristics.split(",") : [],
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
      // version: pet.version,
      // status: "pending",
    });

    res.status(201).send(pet);
  }
);

export { router as createPetRouter };
