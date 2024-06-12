"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const bookControler_1 = require("../controllers/bookControler");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: (req, file, callback) => {
            callback(null, "./public");
        },
        filename: (req, file, callback) => {
            callback(null, file.originalname);
        }
    })
});
exports.bookRouter = express_1.default.Router();
exports.bookRouter.get("/books", bookControler_1.bookControllers.handleGetBook);
exports.bookRouter.get("/books/:id", bookControler_1.bookControllers.handleGetSingleBook);
// bookRouter.post("/books", bookControllers.handleCreatBook);
// bookRouter.post("/books", upload.single("file"), (req, res)=>{
//     console.log(req.file)
// });
exports.bookRouter.post("/books", upload.single("file"), bookControler_1.bookControllers.handleCreatBook);
exports.bookRouter.delete("/books/:id", bookControler_1.bookControllers.handleDeleteBook);
exports.bookRouter.patch("/books/:id", bookControler_1.bookControllers.handleUpdateData);
