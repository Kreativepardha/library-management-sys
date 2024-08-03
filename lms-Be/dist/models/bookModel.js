"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
    accessionNo: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    title: { type: String, required: true },
    edition: { type: String, required: true },
    pages: { type: Number, required: true },
    volume: { type: Number, required: true },
    publisher: { type: String, required: true },
    source: { type: String, required: true },
    billdate: { type: Date, required: true },
    cost: { type: Number, required: true },
    rackno: { type: String, required: true },
    withdrawldate: { type: Date } // Optional field
}, {
    timestamps: true
});
const Book = mongoose_1.default.model('Book', bookSchema);
exports.Book = Book;
