import express from "express";
const router = express.Router();
import authRoutes from "./auth";

router.use("/api/v1/auth", authRoutes);

export default router;
