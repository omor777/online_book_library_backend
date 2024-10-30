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

type BookType = z.infer<typeof bookSchema>;

export { bookSchema, BookType };
