"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const bookrouter_1 = require("./routers/bookrouter");
const authrouter_1 = require("./routers/authrouter");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
mongoose_1.default
    .connect(process.env.DB_URL_DEV)
    .then(() => console.log("mongodb connect..."))
    .catch((err) => console.log("Error"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: "http://127.0.0.1:5173" }));
app.get("/", (req, res) => {
    return res.json({ message: "hello from backend" });
});
app.use("/", bookrouter_1.bookRouter);
app.use("/auth", authrouter_1.authRouter);
app.listen(8000, () => {
    console.log("Port : 8000");
});
