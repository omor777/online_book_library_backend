import { Request, Response, NextFunction } from "express";
import borrowServices from "../../../../lib/borrow";

const create = async (req: Request, res: Response, next: NextFunction) => {
  const { book } = req.body;
  try {
    await borrowServices.create({ book, user: req.user.id });

    const response = {
      statusCode: 201,
      message: "Book borrow request successful",
      links: {
        self: "/borrow_books",
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

export default create;
