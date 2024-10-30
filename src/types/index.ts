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
