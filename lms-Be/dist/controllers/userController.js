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
exports.deleteUser = exports.getAllUsers = exports.getUser = exports.createUser = void 0;
const zod_1 = __importDefault(require("zod"));
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const studentModel_1 = require("../models/studentModel");
const signupBody = zod_1.default.object({
    name: zod_1.default.string(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string()
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = signupBody.safeParse(req.body);
    const { name, email, password, is_admin } = req.body;
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Invalid input "
        });
    }
    try {
        const existingUser = yield userModel_1.User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(411).json({
                message: "Email already taken"
            });
        }
        // const salt = 10;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newuser = yield userModel_1.User.create({
            name,
            email,
            password: hashedPassword,
            is_admin: is_admin !== null && is_admin !== void 0 ? is_admin : false
        });
        const userId = newuser._id;
        const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET);
        res.json({
            message: "User created successfully",
            token: `Bearer ${token}`
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err
        });
    }
});
exports.createUser = createUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return res.json({ msg: "id not found" });
    const existingUser = yield userModel_1.User.findOne({
        _id: id,
    });
    if (!existingUser)
        return res.json({ msg: " USer not available" });
    return res.json({
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        is_admin: existingUser.is_admin,
    });
});
exports.getUser = getUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userModel_1.User.find({}).then((users) => {
        return res.status(200).json({
            users,
        });
    })
        .catch((err) => res.json({ err }));
});
exports.getAllUsers = getAllUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ msg: 'Missing student ID' });
        }
        const student = yield studentModel_1.Student.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).json({ msg: 'Student not found' });
        }
        return res.status(200).json({ msg: 'Student deleted successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
});
exports.deleteUser = deleteUser;
