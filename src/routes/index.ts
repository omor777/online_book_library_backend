import express from "express";
const router = express.Router();
import authRoutes from "./auth";
import bookRoutes from "./book";

router.use("/api/v1/auth", authRoutes);

router.use("/api/v1/books", bookRoutes);

export default router;
