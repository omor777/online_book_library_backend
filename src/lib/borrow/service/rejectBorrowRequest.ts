import Borrow, { BorrowStatus } from "../../../model/borrow.model";
import { badRequest, notFound } from "../../../utils/error";

const rejectBorrowRequest = async (id: string) => {
  const requestedItem = await Borrow.findById(id, "-__v");

  if (!requestedItem) {
    throw notFound();
  }

  if (requestedItem.status !== BorrowStatus.PENDING) {
    throw badRequest("Cannot reject a borrow request that is not pending");
  }

  requestedItem.status = BorrowStatus.REJECTED;
  await requestedItem.save();

  return requestedItem.toObject();
};

export default rejectBorrowRequest;
