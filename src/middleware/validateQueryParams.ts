import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import defaults from "../config/defaults";
const validateQueryParams =
  (schema: z.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt((req.query.page as string) || "1");
    const limit = parseInt((req.query.limit as string) || "10");
    const sort_type = req.query.sort_type || defaults.sortType;
    const sort_by = req.query.sort_by || defaults.sortBy;
    const search = req.query.search || defaults.search;

    try {
      // validate the query parameters using the schema
      schema.parse({
        page,
        limit,
        sort_type,
        sort_by,
        search,
      });

      return next();
    } catch (e) {
      // if validation fails, return a 400 Bad Request response with error details
      if (e instanceof z.ZodError) {
        const formattedErrors = e.errors.map((e) => {
          return {
            field: e.path[0],
            message: e.message,
            in: "query",
          };
        });

        res.status(400).json({
          statusCode: 400,
          error: "Bad request!",
          data: formattedErrors,
        });
        return;
      }
      return next(e);
    }
  };

export default validateQueryParams;
