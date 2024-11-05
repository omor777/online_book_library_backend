import { NextFunction, Request, Response } from "express";
import { pathParamSchema } from "../../../../schema/pathParamSchema";
import { badRequest } from "../../../../utils/error";
import borrowServices from "../../../../lib/borrow";

const acceptBorrowRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if the borrow path param is valid
    const { success, data, error } = pathParamSchema.safeParse(req.params);
    if (!success) {
      console.log(error);
      throw badRequest(error.errors[0].message);
    }

    const acceptedBorrowBook = await borrowServices.acceptBorrowRequest(
      data.id
    );

    const response = {
      statusCode: 200,
      message: "Borrow request accepted",
      data: acceptedBorrowBook,
      links: {
        self: `/borrow_books/${data.id}/accept`,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

export default acceptBorrowRequest;
