import express from "express";
const router = express.Router();
import authRoutes from "./auth";
import bookRoutes from "./book";
import borrowRoutes from "./borrow";

router.use("/api/v1/auth", authRoutes);

router.use("/api/v1/books", bookRoutes);

router.use("/api/v1/borrow_books", borrowRoutes);
export default router;
