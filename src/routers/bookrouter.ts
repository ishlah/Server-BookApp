import express from "express";
import { bookControllers } from "../controllers/bookControler";
import multer from "multer";

const upload = multer ({
    storage : multer.diskStorage({
        destination : (req, file, callback)=>{
            callback(null, "./public")
        },
        filename:(req, file, callback)=>{
            callback(null, file.originalname)
        }
    })
})

export const bookRouter = express.Router();

bookRouter.get("/books", bookControllers.handleGetBook);

bookRouter.get("/books/:id", bookControllers.handleGetSingleBook);

// bookRouter.post("/books", bookControllers.handleCreatBook);

// bookRouter.post("/books", upload.single("file"), (req, res)=>{
//     console.log(req.file)
// });

bookRouter.post("/books", upload.single("file"), bookControllers.handleCreatBook);

bookRouter.delete("/books/:id", bookControllers.handleDeleteBook);

bookRouter.patch("/books/:id", bookControllers.handleUpdateData)
