import { z } from "zod";
import { SortOrder } from "../types";

const baseQueryParamSchema = z.object({
  page: z.coerce
    .number({
      required_error: "Page is required",
    })
    .positive({
      message: "Page must be a positive integer",
    }),
  limit: z.coerce
    .number({
      required_error: "Limit is required",
    })
    .positive({
      message: "Limit must be a positive integer",
    }),
  sort_type: z
    .nativeEnum(SortOrder)
    .optional(),
  sort_by: z.string().trim().optional(),
  search: z.string().optional(),
});

type BaseQueryParamType = z.infer<typeof baseQueryParamSchema>;

export { baseQueryParamSchema, BaseQueryParamType };
