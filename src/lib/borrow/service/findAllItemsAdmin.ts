import defaults from "../../../config/defaults";
import { IBook } from "../../../model/book.model";
import Borrow from "../../../model/borrow.model";
import { IUser } from "../../../model/user.model";

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
  let populateUser = "";
  if (Array.isArray(expand)) {
    populateUser = expand.includes("user") ? "user" : "";
  }

  let populateBook = "";
  if (Array.isArray(expand)) {
    populateBook = expand.includes("book") ? "book" : "";
  }

  // select user populated fields
  let selectUserField;
  if (Array.isArray(user_fields)) {
    selectUserField = "-_id" + " " + user_fields.join(" ");

    if (user_fields.includes("_id")) {
      selectUserField = selectUserField.replace("-_id", "");
    }
  }

  // select book populated fields
  let selectBookField;
  if (Array.isArray(book_fields)) {
    selectBookField = "-_id" + " " + book_fields.join(" ");

    if (book_fields.includes("_id")) {
      selectBookField = selectBookField.replace("-_id", "");
    }
  }
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
