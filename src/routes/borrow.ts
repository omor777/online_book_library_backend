import express from "express";
import { controllers as borrowController } from "../api/v1/borrow";
import authentication from "../middleware/authentication";
import { validateReqBody } from "../middleware/validateReqBody";
import { borrowSchemaBody } from "../schema/borrowSchema";
import authorize from "../middleware/authorize";
import { permissions } from "../config/constranin";

const router = express.Router();

router
  .route("/")
  .get(authentication, authorize(["admin"]), borrowController.findAllItemsAdmin)
  .post(
    authentication,
    validateReqBody(borrowSchemaBody),
    borrowController.create
  );

router.get('')

router.patch(
  "/:id/accept",
  authentication,
  authorize([permissions.admin]),
  borrowController.acceptBorrowRequest
);

router.patch(
  "/:id/reject",
  authentication,
  authorize([permissions.admin]),
  borrowController.rejectBorrowRequest
);

export default router;
