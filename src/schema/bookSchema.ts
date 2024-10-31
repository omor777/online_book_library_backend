import { z } from "zod";

const bookSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .trim()
    .min(2, {
      message: "Title must be at least 2 characters long",
    }),
  author: z
    .string({
      required_error: "Author is required",
    })
    .trim()
    .min(2, {
      message: "Author name must be at least 2 characters long",
    }),
  description: z
    .string({
      required_error: "Description is required",
    })
    .trim()
    .min(20, {
      message: "Description must be at least 20 characters long",
    }),
  genre: z
    .string({
      required_error: "Genre is required",
    })
    .trim(),
  keywords: z
    .string()
    .array()
    .nonempty({
      message: "Keywords array must not be empty",
    })
    .max(8, {
      message: "Keywords array can't exceed 8 elements",
    }),
});

const bookQuerySchema = z.object({
  page: z
    .number({
      required_error: "Page is required",
    })
    .positive({
      message: "Page must be a positive integer",
    }),
  limit: z
    .number({
      required_error: "Limit is required",
    })
    .positive({
      message: "Limit must be a positive integer",
    }),
  sort_type: z.enum(["asc", "dsc"], {
    message: "Sort type must be either 'asc' or 'dsc'",
  }),
  sort_by: z.string().trim().optional(),
  search: z.string().optional(),
});

type BookType = z.infer<typeof bookSchema>;
type BookQueryType = z.infer<typeof bookQuerySchema>;

export { bookSchema, bookQuerySchema, BookType, BookQueryType };
