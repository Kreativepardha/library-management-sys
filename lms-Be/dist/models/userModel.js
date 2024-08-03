"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 30
    },
    email: {
        type: String,
        trim: true,
        maxLength: 30,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 4
    },
    is_admin: {
        type: Boolean
    }
});
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
