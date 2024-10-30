import mongoose, { Schema, model, Document } from "mongoose";
import { UserRole } from "../types";


export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  cover?: string;
  role: UserRole;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cover: { type: String },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userSchema);

export default User;
