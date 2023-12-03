"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerProducts = void 0;
const get_all_products_1 = require("../services/get-all-products");
const products_stripe_repositories_1 = require("../../database/repositories/products-stripe-repositories");
class ControllerProducts {
    async GetAllProductsController(request, response) {
        const ProductRepositoryStripe = new products_stripe_repositories_1.ProductsRepositoryStripe();
        // Por exemplo se eu quisesse passar outro repositorio, eu poderia passar aqui e ai ele implementaria da forma que quiser, seguindo os metodos da classe abstrata
        const result = await new get_all_products_1.GetAllProductsService(ProductRepositoryStripe).execute();
        if (result instanceof Error) {
            return response.status(400).json({ error: result.message });
        }
        return response.status(200).json(result);
    }
}
exports.ControllerProducts = ControllerProducts;
