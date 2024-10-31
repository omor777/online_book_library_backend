import Book from "../../../model/book.model";
import { BookType } from "../../../schema/bookSchema";
import create from "./create";

const updateOrCreate = async ({
  id,
  title,
  author,
  genre,
  cover,
  description,
  keywords,
}: BookType) => {
  const book = await Book.findById(id);
  if (!book) {
    const newBook = await create({
      title,
      author,
      genre,
      cover,
      description,
      keywords,
    });
    return { data: newBook, statusCode: 201 };
  }

  // update book data to database
  book.title = title;
  book.author = author;
  book.genre = genre;
  book.cover = cover;
  book.description = description;
  book.keywords = keywords;

  await book.save();
  return { data: book.toObject(), statusCode: 200 };
};

export default updateOrCreate;
