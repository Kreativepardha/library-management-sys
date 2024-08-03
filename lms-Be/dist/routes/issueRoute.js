"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.issueRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const issueController_1 = require("../controllers/issueController");
const router = express_1.default.Router();
exports.issueRouter = router;
router.post("/", auth_1.isAdmin, issueController_1.issueBook);
router.get("/", auth_1.isAdmin, issueController_1.getAllIssuedBooks);
router.get("/:id", auth_1.isAdmin, issueController_1.getIssuedBookById);
router.get("/returned", auth_1.isAdmin, issueController_1.getReturnedBooks);
router.put("/returned/:id", auth_1.isAdmin, issueController_1.returnBook);
