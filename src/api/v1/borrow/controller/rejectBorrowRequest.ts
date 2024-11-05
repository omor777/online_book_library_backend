import { NextFunction, Request, Response } from "express";
import { pathParamSchema } from "../../../../schema/pathParamSchema";
import { badRequest } from "../../../../utils/error";
import borrowServices from "../../../../lib/borrow";

const rejectBorrowRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const { success, data, error } = pathParamSchema.safeParse({ id });

    if (!success) {
      throw badRequest(error.errors[0].message);
    }

    const rejectedItem = await borrowServices.rejectBorrowRequest(data.id);

    const response = {
      statusCode: 200,
      message: "Borrow request rejected",
      data: rejectedItem,
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

export default rejectBorrowRequest;
