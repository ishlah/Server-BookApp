import { Schema } from "mongoose";

export interface IBook {
  title: string;
  description: string;
  isbn: string;
  author: string;
  file: string;
  available: number;
  userId: Schema.Types.ObjectId;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
}
