import express from "express";
import { controllers as bookController } from "../api/v1/book";
import { validateReqBody } from "../middleware/validateReqBody";
import { bookSchema } from "../schema/bookSchema";
import authentication from "../middleware/authentication";
const router = express.Router();

router.post(
  "/",
  authentication,
  validateReqBody(bookSchema),
  bookController.create
);

export default router;
