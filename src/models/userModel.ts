import { Schema, model } from "mongoose";
import { IUser } from "../types/entity";

const userSchema = new Schema<IUser>({
  name: String,
  email: String,
  password: String,
});

export const Users = model("Users", userSchema);
