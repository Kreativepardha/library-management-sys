"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = require("./routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const dbUrl = process.env.MONGO_URL;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));
app.use('/api/v1', routes_1.mainRouter);
mongoose_1.default.connect(dbUrl)
    .then(() => console.log(`Database connected ${dbUrl}`))
    .catch((err) => console.log(err));
app.listen(PORT, () => console.log(`serve started at ${PORT}`));
