"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductLengthNotFound = void 0;
class ProductLengthNotFound extends Error {
    constructor() {
        super('quantidade de produtos não encontrada');
    }
}
exports.ProductLengthNotFound = ProductLengthNotFound;
