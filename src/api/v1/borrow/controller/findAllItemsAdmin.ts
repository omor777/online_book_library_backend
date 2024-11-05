import { Request, Response, NextFunction } from "express";
import { borrowQueryParamSchema } from "../../../../schema/borrowSchema";
import { z } from "zod";
import formatErrorMessages from "../../../../utils/formatError";
import borrowServices from "../../../../lib/borrow";
import stringToArray from "../../../../utils/stringToArray";

const findAllItemsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // validate query parameters
    const { data, error, success } = borrowQueryParamSchema.safeParse(
      req.query
    );

    if (!success) {
      const err = formatErrorMessages(error, "query");
      res.status(400).json({
        statusCode: 400,
        error: "Bad request",
        data: err,
      });
      return;
    }

    console.log(data);

    const borrowBooks = await borrowServices.findAllItemsAdmin({
      page: data.page,
      limit: data.limit,
      sort_type: data.sort_type,
      sort_by: data.sort_by,
      search: data.search,
      expand: data.expand,
      user_fields: data.user_fields,
      book_fields: data.book_fields,
    });

    const response = {
      statusCode: 200,
      data: borrowBooks,
    };
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

export default findAllItemsAdmin;
