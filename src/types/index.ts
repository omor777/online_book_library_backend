import { Types } from "mongoose";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export enum SortOrder {
  ASCENDING = "asc",
  DESCENDING = "dsc",
}

export enum BorrowExpand {
  USER = "user",
  BOOK = "book",
}

export interface User {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  cover?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookData {
  _id: Types.ObjectId;
  title: string;
  author: string;
  cover: string | null;
  genre: string;
  availability: string;
  description: string;
  keywords: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BaseQueryOptions {
  page: number;
  limit: number;
  sort_type?: string;
  sort_by?: string;
  search?: string;
}

export interface BorrowQueryOptions extends BaseQueryOptions {
  expand: string[] | undefined;
  user_fields?: string[] | undefined;
  book_fields: string[] | undefined;
}
