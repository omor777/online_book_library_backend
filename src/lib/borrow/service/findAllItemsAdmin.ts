import defaults from "../../../config/defaults";
import { IBook } from "../../../model/book.model";
import Borrow from "../../../model/borrow.model";
import { IUser } from "../../../model/user.model";
import populateField from "../../../utils/populateField";
import selectFields from "../../../utils/selectFields";

export enum ExpandField {
  USER = "user",
  BOOK = "book",
}

interface PropType {
  page: number;
  limit: number;
  sort_type?: string;
  sort_by?: string;
  search?: string;
  expand?: string[];
  user_fields?: string[];
  book_fields?: string[];
}

const findAllItemsAdmin = async ({
  page = defaults.page,
  limit = defaults.limit,
  sort_type = defaults.sortType,
  sort_by = defaults.sortBy,
  search = defaults.search,
  expand,
  user_fields,
  book_fields,
}: PropType) => {
  const populateUser = populateField({ expand, field: "user" });
  const populateBook = populateField({ expand, field: "book" });

  const selectUserField = selectFields(user_fields);
  const selectBookField = selectFields(book_fields);
  // TODO:
  //   const filter = { title: { $regex: search, $options: "i" } };
  // console.log(filter);
  const sortStr = `${sort_type === "asc" ? "" : "-"}${sort_by}`;

  const borrowBooks = await Borrow.find({}, "-__v")
    .populate<{
      user: IUser;
    }>({
      path: populateUser,
      select: selectUserField ?? "username -_id",
      strictPopulate: false,
    })

    .populate<{ book: IBook }>({
      path: populateBook,
      select: selectBookField ?? "title -_id",
      strictPopulate: false,
    })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return borrowBooks;
};

export default findAllItemsAdmin;
