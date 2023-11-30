"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductNotFound = void 0;
class ProductNotFound extends Error {
    constructor() {
        super('Product not found');
    }
}
exports.ProductNotFound = ProductNotFound;
