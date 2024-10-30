import { Request, Response, NextFunction } from "express";
import { services as bookService } from "../../../../lib/book";

const create = async (req: Request, res: Response, next: NextFunction) => {
  // check authentication
  // check authorization
  // validate req body
  const { title, author, description, genre, keywords } = req.body;
  // create book data

  // response back
  try {
    const book = await bookService.create({
      title,
      author,
      description,
      genre,
      keywords,
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
