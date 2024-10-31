import Book from "../../../model/book.model";

const count = async ({ search = "" }: { search: string }) => {
  const filter = { title: { $regex: search, $options: "i" } };
  const count = await Book.countDocuments(filter);
  return count;
};

export default count;
