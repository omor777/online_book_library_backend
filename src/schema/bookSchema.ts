import { z } from "zod";

const bookSchema = z.object({
  id: z.string().optional(),
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
    .min(2, {
      message: "Genre name must be at least 2 characters long",
    })
    .trim(),
  keywords: z
    .string({
      required_error: "Keywords are required",
    })
    .array()
    .nonempty({
      message: "Keywords array must not be empty",
    })
    .max(8, {
      message: "Keywords array can't exceed 8 elements",
    }),
  cover: z
    .string()
    .url({
      message: "Please provide a valid cover image URL",
    })
    .optional(),
});



const partialBook = bookSchema.partial();

type BookType = z.infer<typeof bookSchema>;
type PartialBookType = z.infer<typeof partialBook>;


export {
  bookSchema,
  partialBook,
  BookType,
  PartialBookType,
};
