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
exports.updateBook = exports.deleteBook = exports.getBook = exports.getAllBook = exports.createBook = void 0;
const zod_1 = __importDefault(require("zod"));
const bookModel_1 = require("../models/bookModel");
const bookBody = zod_1.default.object({
    accessionNo: zod_1.default.string(),
    author: zod_1.default.string(),
    title: zod_1.default.string(),
    edition: zod_1.default.string().optional(),
    pages: zod_1.default.number().positive(),
    volume: zod_1.default.string().optional(),
    publisher: zod_1.default.string(),
    source: zod_1.default.string(),
    billdate: zod_1.default.string(),
    cost: zod_1.default.number().positive(),
    rackno: zod_1.default.string(),
    withdrawldate: zod_1.default.date().optional()
});
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = bookBody.safeParse(req.body);
        // console.log("RESult"+result)
        if (!result.success) {
            return res.status(400).json({
                msg: "Invalid Input",
                errors: result.error.errors
            });
        }
        const newBook = new bookModel_1.Book(result.data);
        // console.log("NEW boooookd"+newBook)
        yield newBook.save();
        return res.status(201).json({
            message: "Book created Successfullly",
            book: newBook
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err
        });
    }
});
exports.createBook = createBook;
const getAllBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { page = 1, limit = 10, search = '' } = req.query;
        page = parseInt(page, 10);
        limit = parseInt(limit, 10);
        const skip = (page - 1) * limit;
        const filter = {};
        if (search) {
            const regexFilter = { $regex: new RegExp(search, 'i') };
            filter.$or = [
                { title: regexFilter },
                { author: regexFilter },
                { accessionNo: regexFilter },
            ];
        }
        const books = yield bookModel_1.Book.find(filter)
            .skip(skip)
            .limit(limit);
        const totalBooks = yield bookModel_1.Book.countDocuments(filter);
        const totalPages = Math.ceil(totalBooks / limit);
        res.json({
            books,
            totalPages,
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err
        });
    }
});
exports.getAllBook = getAllBook;
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // console.log(id)
        const book = yield bookModel_1.Book.find({ _id: id });
        // console.log(book)
        if (!book) {
            return res.status(404).json({
                message: "Book not Found"
            });
        }
        res.status(200).json(book);
    }
    catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err
        });
    }
});
exports.getBook = getBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedBook = yield bookModel_1.Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({
                msg: "Book not found"
            });
        }
        return res.status(200).json({
            msg: "Book Deleted Successfully",
            book: deletedBook
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err
        });
    }
});
exports.deleteBook = deleteBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    const updates = req.body;
    console.log(updates);
    try {
        const book = yield bookModel_1.Book.findById(id);
        if (!book) {
            return res.status(404).json({ msg: "Book not found" });
        }
        Object.assign(book, updates);
        const updatedBook = yield book.save();
        return res.status(200).json({ msg: "Book Updated Successfully", book: updatedBook });
    }
    catch (err) {
        return res.status(500).json({ msg: "Server Error" });
    }
});
exports.updateBook = updateBook;
