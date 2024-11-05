import mongoose from "mongoose";
import { z } from "zod";

const pathParamSchema = z.object({
  id: z.string().refine(
    (v) => {
      return mongoose.Types.ObjectId.isValid(v);
    },
    (v) => ({ message: `[${v}] is not a valid mongodb id` })
  ),
});

type PathParamType = z.infer<typeof pathParamSchema>;

export { pathParamSchema, PathParamType };
