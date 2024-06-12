import type { Request, Response } from "express";
import { Books } from "../models/bookModel";

export const bookControllers = {
  handleGetBook: async (req: Request, res: Response) => {
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

    const allBooks = await Books.find(CLAUSE);
    res.status(200).json(allBooks);
  },

  handleGetSingleBook: async (req: Request, res: Response) => {
    const id = req.params.id;

    const book = await Books.findById(id);
    res.status(200).json(book);
  },

  handleCreatBook: async (req: Request, res: Response) => {
    const { title, description, isbn, author, available, userId } = req.body;
    const newBook = new Books({
      title,
      description,
      isbn,
      author,
      available,
      userId,
      file: req.file?.originalname,
    });
    const book = await newBook.save();
    res.status(201).json(book);
  },

  // handleEditData: async (req: Request, res: Response) => {
  //   const {userId, bookId} = req.body
  //   console.log(bookId, userId)
  //   return res.status(200).json({message : "Berhasil di update"})
  // },

  handleUpdateData: async (req: Request, res: Response) => {
    try {
        const bookId = req.params.id;

        // Temukan buku berdasarkan ID
        const book = await Books.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Kurangi nilai 'available' hanya jika lebih besar dari 0
        if (book.available > 0) {
            book.available -= 1;
        }

        // Simpan perubahan
        await book.save();

        return res.json({ message: "Book updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
},


  handleDeleteBook: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      await Books.findByIdAndDelete(id);
      res.status(200).json({ message: "Delet success" });
    } catch (error) {
      res.status(500).json({ message: "Delete failed", error });
    }
  },
};
