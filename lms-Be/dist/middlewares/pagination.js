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
const paginationMiddleware = (model) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { page = 1, limit = 10 } = req.query;
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        try {
            if (pageNum <= 0 || limitNum <= 0) {
                throw new Error('Invalid page or limit parameters');
            }
            const results = yield model.find()
                .skip((pageNum - 1) * limitNum)
                .limit(limitNum);
            const total = yield model.countDocuments();
            const totalPages = Math.ceil(total / limitNum);
            res.pagination = {
                results,
                totalPages,
            };
            next();
        }
        catch (err) {
            res.status(500).json({ msg: 'Pagination failed', error: err.message });
        }
    });
};
exports.default = paginationMiddleware;
