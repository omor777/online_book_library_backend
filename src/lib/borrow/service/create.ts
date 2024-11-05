import Book, { BookAvailability } from "../../../model/book.model";
import Borrow from "../../../model/borrow.model";
import { badRequest, notFound } from "../../../utils/error";

const create = async ({
  user,
  book,
}: {
  user: string;
  book: string;
}) => {
  const isAlreadyBorrowRequest = await Borrow.findOne({ book });

  if(isAlreadyBorrowRequest?.status === 'pending') {
    throw badRequest("You have already request for this book");
  }

  const requestedBorrowBook = await Book.findById(book);

  if (!requestedBorrowBook) {
    throw notFound();
  }

  if (requestedBorrowBook.availability !== BookAvailability.AVAILABLE) {
    throw badRequest("Book is not available");
  }

  const borrowBook = new Borrow({
    user,
    book,
  });


  await borrowBook.save();
};

export default create;

/**
 * 0. start
 * 1. req body bookId
 * 2. find in the borrow collection by bookId
 * 3. if status is pending throw error [message] You have already request for this book
 * 4.
 * 2. find book in the book collection by bookId
 * 3. if book not found throw error
 * 4. if book found check availability
 * 5. if book not available throw error
 * 6. if book is available create borrow book data
 * 7. end
 */
