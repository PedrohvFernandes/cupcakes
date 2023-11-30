"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerProducts = void 0;
const get_all_products_1 = require("../services/get-all-products");
class ControllerProducts {
    async GetAllProductsController(request, response) {
        const result = await new get_all_products_1.GetAllProductsService().execute();
        if (result instanceof Error) {
            return response.status(400).json({ error: result.message });
        }
        return response.status(200).json(result);
    }
}
exports.ControllerProducts = ControllerProducts;
