import Book from "../../../model/book.model";
import { notFound } from "../../../utils/error";

const findSingleItem = async (id: string) => {
  const book = await Book.findById(id);
  if (!book) {
    throw notFound();
  }

  return book.toObject();
};

export default findSingleItem;
