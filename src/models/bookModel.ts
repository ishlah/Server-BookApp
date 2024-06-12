import { Schema, model } from "mongoose";
import { IBook } from "../types/entity";

const bookSchema = new Schema<IBook>({
  title: String,
  description: String,
  isbn: String,
  author: String,
  file: String,
  available: Number,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

export const Books = model("Books", bookSchema);
