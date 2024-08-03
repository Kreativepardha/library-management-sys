"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middlewares/auth");
const studentController_1 = require("../controllers/studentController");
const router = express_1.default.Router();
exports.studentRouter = router;
router.post("/", auth_1.isAdmin, studentController_1.createStudent);
router.get("/:id", auth_1.isAdmin, studentController_1.getStudent);
router.get("/", auth_1.isAdmin, studentController_1.getAllstudents);
router.put("/:id", auth_1.isAdmin, studentController_1.updateStudent);
router.delete("/:id", auth_1.isAdmin, userController_1.deleteUser);
