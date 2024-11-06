import { z } from "zod";
import { baseQueryParamSchema } from "./querySchema";

const borrowHistoryQueryParamSchema = baseQueryParamSchema.extend({
  expand: z
    .string()
    .refine(
      (v) => v === "user",
      (v) => ({ message: `Expected user got -> [${v}]` })
    )
    .optional(),
});

type BorrowHistoryQueryParamType = z.infer<
  typeof borrowHistoryQueryParamSchema
>;

export { borrowHistoryQueryParamSchema, BorrowHistoryQueryParamType };
