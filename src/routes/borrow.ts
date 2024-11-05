import express from "express";
import { controllers as borrowController } from "../api/v1/borrow";
import authentication from "../middleware/authentication";
import { validateReqBody } from "../middleware/validateReqBody";
import {
  borrowQueryParamSchema,
  borrowSchemaBody,
} from "../schema/borrowSchema";
import authorize from "../middleware/authorize";
import validateQueryParams from "../middleware/validateQueryParams";

const router = express.Router();

router
  .route("/")
  .get(authentication, authorize(["admin"]), borrowController.findAllItemsAdmin)
  .post(
    authentication,
    validateReqBody(borrowSchemaBody),
    borrowController.create
  );

export default router;
