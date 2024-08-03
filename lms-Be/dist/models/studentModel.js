"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const studentSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        trim: true,
    },
    hallTicket: {
        type: Number,
        unique: true,
        required: true
    },
    year: {
        type: String,
        enum: ["1", "2", "3", "4"],
        required: true
    },
    batch: {
        type: String,
    },
    dept: {
        type: String,
        enum: ["BBA", "BS"],
        required: true
    },
    issuedBooks: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ]
});
const Student = mongoose_1.default.model('Student', studentSchema);
exports.Student = Student;
