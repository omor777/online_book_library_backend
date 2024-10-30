import Book from "../../../model/book.model";
import { BookType } from "../../../schema/bookSchema";

const create = async ({
  title,
  author,
  description,
  genre,
  keywords,
}: BookType) => {
  const book = new Book({
    title,
    author,
    description,
    genre,
    keywords,
  });

  await book.save();

  return book.toObject();
};

export default create;
