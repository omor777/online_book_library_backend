import defaults from "../../../config/defaults";
import { IBook } from "../../../model/book.model";
import Borrow from "../../../model/borrow.model";
import { IUser } from "../../../model/user.model";
import { BorrowQueryOptions } from "../../../types";
import populateField from "../../../utils/populateField";
import selectFields from "../../../utils/selectFields";

const findAllItemsUser = async (
  id: string,
  {
    page = defaults.page,
    limit = defaults.limit,
    sort_by = defaults.sortBy,
    sort_type = defaults.sortType,
    search = defaults.search,
    expand,
    user_fields,
    book_fields,
  }: BorrowQueryOptions
) => {
  //populate filed
  const populateUser = populateField({ expand, field: "user" });
  const populateBook = populateField({ expand, field: "book" });

  const sortStr = `${sort_type === "asc" ? "" : "-"}${sort_by}`;

  const selectUserFields = selectFields(user_fields);
  const selectBookFields = selectFields(book_fields);

  const allBorrowItems = await Borrow.find({ user: id }, ["-__v"])
    .populate<{
      book: IBook;
    }>({
      path: populateBook,
      strictPopulate: false,
      select: selectBookFields ?? ["-__v", "-availability", "-_id"],
    })
    .populate<{ user: IUser }>({
      path: populateUser,
      strictPopulate: false,
      select: selectUserFields ?? ["-__v", "-password", "-_id"],
    })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return allBorrowItems;
};

export default findAllItemsUser;
