"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const router_1 = require("./router");
// PORT = A porta que a plataforma(vercel) de deploy vai oferecer --> colocar ela so na parte de produção da plataforma
const PORT = process.env.PORT ?? 3333;
// PRODORDEV = seudominion.com --> colocar ela so na parte de produção da plataforma(vercel)
const PRODORDEV = process.env.PRODORDEV ?? 'http://localhost:3000';
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: PRODORDEV,
    optionsSuccessStatus: 200,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']
}));
app.use('/', router_1.routes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
