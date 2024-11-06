import Borrow from "../../../model/borrow.model";

const countBorrowItemsUser = async (id: string): Promise<number> => {
  const count = await Borrow.countDocuments({ user: id });
  return count;
};

export default countBorrowItemsUser;
