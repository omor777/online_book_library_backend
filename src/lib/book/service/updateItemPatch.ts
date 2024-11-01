import { HydratedDocument } from "mongoose";
import Book, { IBook } from "../../../model/book.model";
import { PartialBookType } from "../../../schema/bookSchema";
import { notFound } from "../../../utils/error";

const updateProperties = async ({
  id,
  title,
  author,
  description,
  genre,
  keywords,
  cover,
}: PartialBookType) => {
  const book: HydratedDocument<IBook> | null = await Book.findById(id);

  if (!book) {
    throw notFound();
  }

  // update book properties
  book.title = title ?? book.title;
  book.author = author ?? book.author;
  book.description = description ?? book.description;
  book.genre = genre ?? book.genre;
  book.keywords = keywords ?? book.keywords;
  book.cover = cover ?? book.cover;

  await book.save();

  return book.toObject();
};

export default updateProperties;
