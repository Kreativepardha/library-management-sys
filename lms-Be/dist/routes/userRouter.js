"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
exports.userRouter = router;
router.post("/", userController_1.createUser);
router.get("/:id", userController_1.getUser);
router.get("/", auth_1.isAdmin, userController_1.getAllUsers);
router.delete("/:id", auth_1.isAdmin, userController_1.deleteUser);
