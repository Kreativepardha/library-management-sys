"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = __importDefault(require("express"));
const userRouter_1 = require("./userRouter");
const bookRouter_1 = require("./bookRouter");
const issueRoute_1 = require("./issueRoute");
const authRoute_1 = require("./authRoute");
const studentRouter_1 = require("./studentRouter");
const router = express_1.default.Router();
exports.mainRouter = router;
router.use("/user", userRouter_1.userRouter);
router.use("/student", studentRouter_1.studentRouter);
router.use("/book", bookRouter_1.bookRouter);
router.use("/issue", issueRoute_1.issueRouter);
router.use("/auth", authRoute_1.authRouter);
