import express from "express";
import { controllers as bookController } from "../api/v1/book";
import { validateReqBody } from "../middleware/validateReqBody";
import { bookSchema, partialBook } from "../schema/bookSchema";
import authentication from "../middleware/authentication";
import validateQueryParams from "../middleware/validateQueryParams";
import authorize from "../middleware/authorize";
import { baseQueryParamSchema } from "../schema/querySchema";
const router = express.Router();

router.post(
  "/",
  authentication,
  validateReqBody(bookSchema),
  bookController.create
);
router.get(
  "/",
  validateQueryParams(baseQueryParamSchema),
  bookController.findAllItems
);

router
  .route("/:id")
  .get(bookController.findSingleItem)
  .put(validateReqBody(bookSchema), bookController.updateItem)
  .patch(validateReqBody(partialBook), bookController.updateItemPatch)
  .delete(authentication, authorize(['admin']), bookController.deleteItem);

export default router;
