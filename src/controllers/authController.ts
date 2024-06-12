import type { Request, Response } from "express";
import { Users } from "../models/userModel";
import bcypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authControllers = {
  handleRegister: async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcypt.hash(password, 12);

    try {
      const user = await Users.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "Email already exist" });
      }
      const newUser = new Users({
        name,
        email,
        password: hashedPassword,
      });
      const saveUser = await newUser.save();

      res.status(201).json({user : saveUser});
    } catch (error) {
      res.status(500).json({ message: "Register error" });
    }
  },

  handleLogin: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Cek email
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }
    // Cek password
    const isPassword = await bcypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json({ message: "Password invalid" });
    }
    // buat payload/ body
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    // Generate token
    const token = jwt.sign(payload, process.env.JWT_TOKEN as string);

    // Set di cookie
    res.status(200).json({ message: "Login success", user: payload, token });
  },
};
