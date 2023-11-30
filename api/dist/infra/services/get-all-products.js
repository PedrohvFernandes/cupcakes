"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllProductsService = void 0;
const product_not_found_1 = require("../error/product-not-found");
class GetAllProductsService {
    async execute() {
        const product = null;
        if (product === null) {
            return new product_not_found_1.ProductNotFound();
        }
        return 'Hello World';
    }
}
exports.GetAllProductsService = GetAllProductsService;
