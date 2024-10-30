import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const validateReqBody = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      return next();
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.map((e) => ({
          field: e.path[0],
          message: e.message,
        }));
        res.status(400).json({
          statusCode: 400,
          error: "Bad request!",
          data: formattedErrors,
        });
        return;
      }
      return next(error);
    }
  };
};

export { validateReqBody };
