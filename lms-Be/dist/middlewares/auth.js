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
exports.isAdmin = exports.isAuthenticated = void 0;
const userModel_1 = require("../models/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    // console.log("authHeader in isAuthenticated:", authHeader); 
    if (!authHeader) {
        return res.status(401).json({ msg: "User is not authenticated" });
    }
    const token = authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({ msg: "User is not authenticated" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ msg: "Invalid Token" });
    }
});
exports.isAuthenticated = isAuthenticated;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    // console.log("authHeader in isAdmin:", authHeader);
    if (!authHeader) {
        return res.status(401).json({ msg: "User is not authenticated" });
    }
    const token = authHeader.split(' ')[1];
    // console.log("Token in isAdmin:", token);
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // console.log("decoded in isAdmin:", decoded);
        const user = yield userModel_1.User.findById(decoded.userId);
        // console.log("user in isAdmin:", user);`
        if (!user) {
            return res.status(401).json({ msg: "User does not exist" });
        }
        if (!user.is_admin) {
            return res.status(403).json({ msg: "User is not admin" });
        }
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ msg: "Invalid Tokenadmin" });
    }
});
exports.isAdmin = isAdmin;
