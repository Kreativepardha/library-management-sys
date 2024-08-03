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
exports.deleteStudent = exports.updateStudent = exports.getStudent = exports.getAllstudents = exports.createStudent = void 0;
const zod_1 = require("zod");
const studentModel_1 = require("../models/studentModel");
const updateStudentBody = zod_1.z.object({
    name: zod_1.z.string().trim().optional(),
    hallTicket: zod_1.z.number().optional(),
    year: zod_1.z.enum(["1", "2", "3", "4"]).optional(),
    batch: zod_1.z.string().optional(),
    dept: zod_1.z.enum(["BBA", "BS"]).optional(),
});
const studentBody = zod_1.z.object({
    name: zod_1.z.string().trim().max(30),
    hallTicket: zod_1.z.number(),
    year: zod_1.z.enum(["1", "2", "3", "4"]),
    batch: zod_1.z.string().optional(),
    dept: zod_1.z.enum(["BBA", "BS"]),
});
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = studentBody.safeParse(req.body);
    const { name, hallTicket, year, batch, dept } = req.body;
    if (!result) {
        return res.json(411).json({
            message: "Invalid Inputs",
        });
    }
    // const { name, hallTicket, year, batch, dept } = result.data;
    try {
        const existingStudent = yield studentModel_1.Student.findOne({ hallTicket });
        if (existingStudent)
            return res.status(411).json({ message: "Student already exits" });
        const student = new studentModel_1.Student({ name, hallTicket, year, batch, dept });
        yield student.save();
        return res.status(201).json(student);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }
});
exports.createStudent = createStudent;
const getAllstudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield studentModel_1.Student.find();
        return res.status(200).json(students);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Server Error' });
    }
});
exports.getAllstudents = getAllstudents;
const getStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return res.json({ msg: "id not provided" });
    try {
        const student = yield studentModel_1.Student.findById(id).populate({
            path: 'issuedBooks',
            populate: {
                path: 'book',
                select: 'title author'
            }
        });
        console.log(student);
        if (!student)
            return res.status(404).json({ msg: "Student not available" });
        return res.status(200).json(student);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Server Error' });
    }
});
exports.getStudent = getStudent;
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { success, data } = updateStudentBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Invalid Inputs",
        });
    }
    try {
        const updatestudent = yield studentModel_1.Student.findByIdAndUpdate(id, data, { new: true });
        if (!exports.updateStudent)
            return res.status(404).json({ msg: "Student not found" });
        return res.status(200).json({
            message: "Updated successfully",
            data: exports.updateStudent,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Server Error' });
    }
});
exports.updateStudent = updateStudent;
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const student = yield studentModel_1.Student.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).json({ msg: 'Student not found' });
        }
        return res.status(200).json({ msg: 'Student deleted successfully' });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Server Error' });
    }
});
exports.deleteStudent = deleteStudent;
