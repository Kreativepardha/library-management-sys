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
exports.getReturnedBooks = exports.returnBook = exports.getIssuedBookById = exports.getAllIssuedBooks = exports.issueBook = void 0;
const bookModel_1 = require("../models/bookModel");
const studentModel_1 = require("../models/studentModel");
const issueModel_1 = require("../models/issueModel");
const issueBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, accessionNo, issuedDate } = req.body;
    console.log('Received request to issue book:', { id, accessionNo, issuedDate });
    if (!id || !accessionNo || !issuedDate) {
        console.log('Missing required fields:', { id, accessionNo, issuedDate });
        return res.status(400).json({
            msg: "Please enter all fields"
        });
    }
    try {
        const student = yield studentModel_1.Student.findById(id);
        const book = yield bookModel_1.Book.findOne({ accessionNo });
        if (!book) {
            console.log('Book not found with accessionNo:', accessionNo);
            return res.status(404).json({ msg: "Book not found" });
        }
        if (!student) {
            console.log('Student not found with id:', id);
            return res.status(404).json({ msg: "Student not found" });
        }
        if (book.volume <= 0) {
            return res.status(400).json({ msg: "No copies Available to issue" });
        }
        const existingIssue = yield issueModel_1.Issue.findOne({ book: book._id, student: student._id, returned: false });
        if (existingIssue) {
            return res.status(400).json({ msg: "Book is already issued to this student" });
        }
        const issue = new issueModel_1.Issue({
            student: student._id,
            book: book._id,
            issuedDate: new Date(issuedDate)
        });
        yield issue.save();
        book.volume -= 1;
        yield book.save();
        yield studentModel_1.Student.findByIdAndUpdate(student._id, {
            $push: { issuedBooks: issue._id }
        });
        return res.status(200).json({
            msg: "Book issued to the student",
            issue
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }
});
exports.issueBook = issueBook;
const getAllIssuedBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const issues = yield issueModel_1.Issue.find().populate('book').populate('student');
        return res.status(200).json(issues);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }
});
exports.getAllIssuedBooks = getAllIssuedBooks;
const getIssuedBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const issue = yield issueModel_1.Issue.findById(id).populate('book').populate('student');
        if (!issue) {
            return res.status(404).json({ msg: "Issue not found" });
        }
        return res.status(200).json(issue);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }
});
exports.getIssuedBookById = getIssuedBookById;
const returnBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    try {
        if (!id) {
            return res.status(400).json({ msg: "ID not provided" });
        }
        const issue = yield issueModel_1.Issue.findById(id);
        // console.log(issue)
        if (!issue) {
            return res.status(404).json({ msg: "Issue not found" });
        }
        issue.returned = true;
        yield issue.save();
        const book = yield bookModel_1.Book.findById(issue.book);
        if (book) {
            book.volume += 1;
            yield book.save();
        }
        yield studentModel_1.Student.findByIdAndUpdate(issue.student, {
            $pull: { issuedBooks: issue._id }
        });
        return res.status(200).json({ msg: "Book returned successfully" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }
});
exports.returnBook = returnBook;
const getReturnedBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const returnedBooks = yield issueModel_1.Issue.find({ returned: true }).populate('book').populate('student');
        console.log(returnedBooks);
        return res.status(200).json(returnedBooks);
    }
    catch (err) {
        console.error('Error fetching returned books:', err);
        return res.status(500).json({ msg: 'Server Error' });
    }
});
exports.getReturnedBooks = getReturnedBooks;
