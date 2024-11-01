import { Request, Response, NextFunction } from "express";
import { services as bookService } from "../../../../lib/book";

const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    await bookService.deleteItem(id);

    const response = {
      statusCode: 204,
      message: "Delete successful",
    };
    res.status(204).json(response);
  } catch (e) {
    next(e);
  }
};

export default deleteItem;
