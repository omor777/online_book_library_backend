import express from "express";
import { controllers as borrowController } from "../api/v1/borrow";
import authentication from "../middleware/authentication";

const router = express.Router();

router.route("/").post(authentication, borrowController.create);

export default router;
