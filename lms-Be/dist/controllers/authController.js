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
exports.logoutUser = exports.loginUser = void 0;
const userModel_1 = require("../models/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "Please enter all the credentials" });
        }
        const userExist = yield userModel_1.User.findOne({ email });
        if (!userExist) {
            return res.status(404).json({ msg: "User does not exist. Please signup" });
        }
        const isPassValid = yield bcrypt_1.default.compare(password, userExist.password);
        if (!isPassValid) {
            return res.status(401).json({ msg: "Invalid password" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: userExist._id }, process.env.JWT_SECRET);
        res.json({
            email: userExist.email,
            name: userExist.name,
            is_admin: userExist.is_admin,
            token: `Bearer ${token}`,
            id: userExist._id,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }
});
exports.loginUser = loginUser;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.removeHeader("Authorization");
        res.json({ msg: "Logout Successful" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }
});
exports.logoutUser = logoutUser;
