import express from "express";
import userServices from "../api/v1/user";
import authentication from "../middleware/authentication";
import authorize from "../middleware/authorize";
import { permissions } from "../config/constranin";

const router = express.Router();

router.get(
  "/:id/borrow_books",
  authentication,
  authorize([permissions.user]),
  userServices.findAllItemsUser
);

export default router;
