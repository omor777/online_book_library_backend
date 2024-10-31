import { Request, Response, NextFunction } from "express";
import { services as bookService } from "../../../../lib/book";

const create = async (req: Request, res: Response, next: NextFunction) => {
  const { title, author, description, genre, keywords,cover } = req.body;

  try {
    const book = await bookService.create({
      title,
      author,
      description,
      genre,
      keywords,
      cover,
    });

    const response = {
      statusCode: 201,
      message: "Book created successfully",
      data: book,
      links: {
        self: "/books",
      },
    };
    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

export default create;
