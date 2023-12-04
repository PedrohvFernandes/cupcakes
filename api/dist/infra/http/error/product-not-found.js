"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductNotFound = void 0;
class ProductNotFound extends Error {
    constructor() {
        super('produto não encontrado');
    }
}
exports.ProductNotFound = ProductNotFound;
