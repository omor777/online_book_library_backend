import { Request, Response, NextFunction } from "express";
import { services as bookService } from "../../../../lib/book";

const findSingleItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const book = await bookService.findSingleItem(id);

    const response = {
      statusCode: 200,
      data: book,
      links: {
        self: `/books/${id}`,
      },
    };
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

export default findSingleItem;
