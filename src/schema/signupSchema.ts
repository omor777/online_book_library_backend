import { z } from "zod";

const signupBodySchema = z.object({
  username: z
    .string({
      required_error: "username is required",
    })
    .trim()
    .toLowerCase()
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .max(15, {
      message: "Username can't exceed 15 characters",
    }),
  email: z
    .string()
    .email({
      message: "Please provide a valid email address",
    })
    .trim()
    .toLowerCase(),
  password: z.string().trim().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  cover: z
    .string()
    .trim()
    .url({
      message: "Please provide a valid cover image URL",
    })
    .optional(),
});

const signupQuerySchema = z.object({
    
});

type SignupBody = z.infer<typeof signupBodySchema>;
type SignupQuery = z.infer<typeof signupQuerySchema>;

export { signupBodySchema, SignupBody, SignupQuery };
