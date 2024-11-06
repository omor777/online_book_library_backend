import express from "express";
const router = express.Router();
import authRoutes from "./auth";
import bookRoutes from "./book";
import borrowRoutes from "./borrow";
import userRoutes from "./user";

router.use("/api/v1/auth", authRoutes);

router.use("/api/v1/books", bookRoutes);

router.use("/api/v1/borrow_books", borrowRoutes);

router.use("/api/v1/users", userRoutes);
export default router;
