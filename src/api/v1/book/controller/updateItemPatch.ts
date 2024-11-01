import { NextFunction, Request, Response } from "express";
import { services as bookService } from "../../../../lib/book";

const updateItemPatch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { title, description, author, genre, cover, keywords } = req.body;

  try {
    const updatedBook = await bookService.updateProperties({
        id,
        title,
        description,
        author,
        genre,
        cover,
        keywords,
  
    });

    const response = {
      statusCode: 200,
      message: "Book updated successfully",
      data: updatedBook,
      links: {
        self: `/books/${id}`,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

export default updateItemPatch;
