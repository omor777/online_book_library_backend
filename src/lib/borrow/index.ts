import {
  create,
  findAllItemsAdmin,
  acceptBorrowRequest,
  rejectBorrowRequest,
  findAllItemsUser,
  countBorrowItemsUser,
} from "./service";

const borrowServices = {
  create,
  findAllItemsAdmin,
  acceptBorrowRequest,
  rejectBorrowRequest,
  findAllItemsUser,
  countBorrowItemsUser,
};

export default borrowServices;
