import defaults from "../../../config/defaults";
import Book from "../../../model/book.model";

interface PropType {
  search: string;
  sort_by: string;
  sort_type: string;
  page: number;
  limit: number;
}

const findAllItems = async ({
  search = defaults.search,
  sort_by = defaults.sortBy,
  sort_type = defaults.sortType,
  page = defaults.page,
  limit = defaults.limit,
}: PropType) => {
  const filter = { title: { $regex: search, $options: "i" } };

  const sortStr = `${sort_type === "asc" ? "" : "-"}${sort_by}`;
  console.log(sortStr);

  const books = await Book.find(filter)
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return books;
};

export default findAllItems;