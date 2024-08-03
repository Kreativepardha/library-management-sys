"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const bookController_1 = require("../controllers/bookController");
const pagination_1 = __importDefault(require("../middlewares/pagination"));
const bookModel_1 = require("../models/bookModel");
const router = express_1.default.Router();
exports.bookRouter = router;
router.get("/", auth_1.isAuthenticated, (0, pagination_1.default)(bookModel_1.Book), bookController_1.getAllBook);
router.post("/", auth_1.isAdmin, bookController_1.createBook);
router.get("/:id", bookController_1.getBook);
router.delete("/:id", auth_1.isAdmin, bookController_1.deleteBook);
router.put("/:id", auth_1.isAdmin, bookController_1.updateBook);
