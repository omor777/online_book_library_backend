import { Types } from "mongoose";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
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
