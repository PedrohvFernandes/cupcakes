"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductLengthNotFound = void 0;
class ProductLengthNotFound extends Error {
    constructor() {
        super('Length of product not found');
    }
}
exports.ProductLengthNotFound = ProductLengthNotFound;
