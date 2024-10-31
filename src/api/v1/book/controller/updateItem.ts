import { NextFunction, Request, Response } from "express";
import { services as bookService } from "../../../../lib/book";

const updateItem = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { title, author, genre, cover, description, keywords } = req.body;
  try {
    const book = await bookService.updateOrCreate({
      id,
      title,
      author,
      genre,
      cover,
      description,
      keywords,
    });

    const response = {
      statusCode: book.statusCode,
      message:
        book.statusCode === 200
          ? "Book updated successfully"
          : "Book created successfully",
      data: book.data,
      links:{
        self:`/books/${id}`
      }
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

export default updateItem;
