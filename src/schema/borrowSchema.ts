import mongoose from "mongoose";
import { z } from "zod";

const borrowSchemaBody = z.object({
  userId: z
    .string({
      required_error: "User ID is required",
    })
    .refine(
      (v) => mongoose.Types.ObjectId.isValid(v),
      (v) => ({
        message: `[${v}] is not a valid id`,
      })
    )
    .optional(),
  bookId: z
    .string({
      required_error: "Book ID is required",
    })
    .refine(
      (v) => mongoose.Types.ObjectId.isValid(v),
      (v) => ({
        message: `[${v}] is not a valid id`,
      })
    ),
});

type BorrowSchemaBody = z.infer<typeof borrowSchemaBody>;

export { borrowSchemaBody, BorrowSchemaBody };
