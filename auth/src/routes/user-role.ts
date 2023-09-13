// import express from "express";
// import jwt from "jsonwebtoken";
// import { NotFoundError, requireAuth } from "@giveapaw/common";
// import { User } from "../models/user";

// const router = express.Router();

// router.get("/api/users/userrole/:id", requireAuth, async (req, res) => {
//   const user = await User.findById(req.params.id);
//   if (!user) {
//     throw new NotFoundError();
//   }

//   res.send(user.role);
// });

// export { router as roleUserRouter };
