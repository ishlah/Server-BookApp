"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authControllers = void 0;
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.authControllers = {
    handleRegister: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email, password } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 12);
        try {
            const user = yield userModel_1.Users.findOne({ email });
            if (user) {
                return res.status(400).json({ message: "Email already exist" });
            }
            const newUser = new userModel_1.Users({
                name,
                email,
                password: hashedPassword,
            });
            const saveUser = yield newUser.save();
            res.status(201).json({ user: saveUser });
        }
        catch (error) {
            res.status(500).json({ message: "Register error" });
        }
    }),
    handleLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        // Cek email
        const user = yield userModel_1.Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Email not found" });
        }
        // Cek password
        const isPassword = yield bcrypt_1.default.compare(password, user.password);
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
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_TOKEN);
        // Set di cookie
        res.status(200).json({ message: "Login success", user: payload, token });
    }),
};
