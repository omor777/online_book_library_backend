import { Schema, model, Document, Types } from "mongoose";

export enum BookAvailability {
  AVAILABLE = "available",
  NOT_AVAILABLE = "not_available",
}

export interface IBook extends Document {
  title: string;
  author: string;
  genre: string;
  description: string;
  cover?: string;
  keywords: string[];
  availability: BookAvailability;
  createdAt?: Date;
  updatedAt?: Date;
}

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      default: "",
    },
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
