import mongoose from "mongoose";
import { z } from "zod";
import { baseQueryParamSchema } from "./querySchema";
import { BorrowExpand } from "../types";

const borrowSchemaBody = z.object({
  user: z
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
  book: z
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

const borrowQueryParamSchema = baseQueryParamSchema.extend({
  expand: z
    .string()
    .transform((v) => v.split(","))
    .refine(
      (v) => v.includes(BorrowExpand.USER) || v.includes(BorrowExpand.BOOK),

      (v) => ({
        message: `Invalid expand value. Expected 'user' | 'book'. Received ${v.join(
          ","
        )}`,
      })
    )
    .optional(),

  user_fields: z
    .string()
    .transform((v) =>
      v.split(",").filter((v) => {
        return (
          v === "username" ||
          v === "email" ||
          v === "_id" ||
          v === "createdAt" ||
          v === "updatedAt"
        );
      })
    )
    .refine(
      (v) => {
        return v.length > 0;
      },
      {
        message: `Invalid user_fields value. Expected '_id', 'username', 'email', 'createdAt', 'updatedAt`,
      }
    )
    .optional(),

  book_fields: z
    .string()
    .transform((v) =>
      v.split(",").filter((v) => {
        return (
          v === "_id" ||
          v === "title" ||
          v === "author" ||
          v === "genre" ||
          v === "keywords" ||
          v === "availability" ||
          v === "createdAt"
        );
      })
    )
    .refine(
      (v) => v.length > 0,
      (v) => ({
        message: `Invalid book_fields value. Expected '_id', 'title', 'author', 'genre', 'keywords', 'availability', 'createdAt'`,
      })
    )
    .optional(),
});

type BorrowBodyType = z.infer<typeof borrowSchemaBody>;
type BorrowQueryParamType = z.infer<typeof borrowQueryParamSchema>;

export {
  borrowSchemaBody,
  borrowQueryParamSchema,
  BorrowBodyType,
  BorrowQueryParamType,
};
