import mongoose, { Schema, model, Document, Types } from "mongoose";

enum BorrowStatus {
  PENDING = "pending",
  BORROWED = "borrowed",
  RETURNED = "returned",
  REJECTED = "rejected",
  OVERDUE = "overdue",
}

export interface IBorrow extends Document {
  user: Types.ObjectId;
  book: Types.ObjectId;
  status: BorrowStatus;
  borrowDate?: Date;
  returnDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const borrowSchema = new Schema<IBorrow>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(BorrowStatus),
      default: BorrowStatus.PENDING,
    },
    borrowDate: {
      type: Date,
      default: null,
    },
    returnDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Borrow = model<IBorrow>("Borrow", borrowSchema);

export default Borrow;
