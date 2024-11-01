import { Types } from "mongoose";
import Book from "../../../model/book.model";
import { notFound } from "../../../utils/error";

const deleteItem = async (id: string) => {
  const deletedBook = await Book.findByIdAndDelete(id);
  if (!deletedBook) {
    throw notFound();
  }
};

export default deleteItem;
