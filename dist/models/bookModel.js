"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    isbn: String,
    author: String,
    file: String,
    available: Number,
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
});
exports.Books = (0, mongoose_1.model)("Books", bookSchema);
