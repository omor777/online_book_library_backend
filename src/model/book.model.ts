import { Schema, model, Document, Types } from "mongoose";

enum BookAvailability {
  AVAILABLE = "available",
  NOT_AVAILABLE = "not_available",
}

interface IBook extends Document {
  title: string;
  author: Types.ObjectId;
  genre: string;
  description: string;
  cover?: string;
  keywords: Array<string>;
  availability: BookAvailability;
}

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    cover: String,
    description: {
      type: String,
      required: true,
    },
    keywords: {
      type: [String],
      required: true,
    },
    availability: {
      type: String,
      enum: Object.values(BookAvailability),
      default: BookAvailability.AVAILABLE,
    },
  },
  {
    timestamps: true,
  }
);

const Book = model<IBook>("Book", bookSchema);

export default Book;
