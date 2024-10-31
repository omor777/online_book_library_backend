import Book from "../../../model/book.model";
import { BookType } from "../../../schema/bookSchema";

const create = async ({
  title,
  author,
  description,
  genre,
  keywords,
  cover,
}: BookType) => {
  const book = new Book({
    title,
    author,
    description,
    genre,
    keywords,
    cover,
  });

  await book.save();

  return book.toObject();
};

export default create;
