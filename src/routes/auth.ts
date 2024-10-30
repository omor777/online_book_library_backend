import express from "express";
import { controllers as authController } from "../api/v1/auth";
import { validateReqBody } from "../middleware/validateReqBody";
import { validation } from "../schema";
const router = express.Router();

router.post(
  "/register",
  validateReqBody(validation.signupBodySchema),
  authController.register
);

export default router;
