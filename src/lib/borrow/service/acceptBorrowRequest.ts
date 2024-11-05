import Borrow, { BorrowStatus } from "../../../model/borrow.model";
import { notFound } from "../../../utils/error";

import dayjs from "dayjs";

const acceptBorrowRequest = async (id: string) => {
  const requestedItem = await Borrow.findById(id);
  if (!requestedItem) {
    throw notFound();
  }

  const borrow_date = dayjs().toDate();
  const return_date = dayjs().add(5, "day").toDate();

  requestedItem.status = BorrowStatus.BORROWED;
  requestedItem.borrowDate = borrow_date;
  requestedItem.returnDate = return_date;

  await requestedItem.save();

  return requestedItem.toObject();
};

export default acceptBorrowRequest;
