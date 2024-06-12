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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookControllers = void 0;
const bookModel_1 = require("../models/bookModel");
exports.bookControllers = {
    handleGetBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { search } = req.query;
        const CLAUSE = search
            ? {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { author: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } },
                ],
            }
            : {};
        const allBooks = yield bookModel_1.Books.find(CLAUSE);
        res.status(200).json(allBooks);
    }),
    handleGetSingleBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const book = yield bookModel_1.Books.findById(id);
        res.status(200).json(book);
    }),
    handleCreatBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { title, description, isbn, author, available, userId } = req.body;
        const newBook = new bookModel_1.Books({
            title,
            description,
            isbn,
            author,
            available,
            userId,
            file: (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname,
        });
        const book = yield newBook.save();
        res.status(201).json(book);
    }),
    // handleEditData: async (req: Request, res: Response) => {
    //   const {userId, bookId} = req.body
    //   console.log(bookId, userId)
    //   return res.status(200).json({message : "Berhasil di update"})
    // },
    handleUpdateData: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bookId = req.params.id;
            // Temukan buku berdasarkan ID
            const book = yield bookModel_1.Books.findById(bookId);
            if (!book) {
                return res.status(404).json({ message: "Book not found" });
            }
            // Kurangi nilai 'available' hanya jika lebih besar dari 0
            if (book.available > 0) {
                book.available -= 1;
            }
            // Simpan perubahan
            yield book.save();
            return res.json({ message: "Book updated successfully" });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }),
    handleDeleteBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            yield bookModel_1.Books.findByIdAndDelete(id);
            res.status(200).json({ message: "Delet success" });
        }
        catch (error) {
            res.status(500).json({ message: "Delete failed", error });
        }
    }),
};
