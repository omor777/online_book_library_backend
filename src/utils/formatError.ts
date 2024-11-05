// interface ZodError {

import { z } from "zod";

type ValidationError = {
  field: string | number;
  message: string;
  in: string;
};

const formatErrorMessages = (
  errors: z.ZodError,
  where: "query" | "body"
): Array<ValidationError> => {
  return errors.issues.map((e) => ({
    field: e.path[0],
    message: e.message,
    in: where,
  }));
};

export default formatErrorMessages;
