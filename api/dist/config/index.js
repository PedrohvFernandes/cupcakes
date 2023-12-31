"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigBases = exports.ConfigAuth = void 0;
var auth_1 = require("./auth");
Object.defineProperty(exports, "ConfigAuth", { enumerable: true, get: function () { return __importDefault(auth_1).default; } });
var bases_1 = require("./bases");
Object.defineProperty(exports, "ConfigBases", { enumerable: true, get: function () { return __importDefault(bases_1).default; } });
