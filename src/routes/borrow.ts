import express from "express";
import { controllers as borrowController } from "../api/v1/borrow";
import authentication from "../middleware/authentication";
import { validateReqBody } from "../middleware/validateReqBody";
import { borrowSchemaBody } from "../schema/borrowSchema";

const router = express.Router();

router
  .route("/")
  .post(
    authentication,
    validateReqBody(borrowSchemaBody),
    borrowController.create
  );

export default router;
