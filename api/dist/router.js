"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const controller_product_1 = require("./infra/http/controller/controller-product");
const express_1 = require("express");
exports.routes = (0, express_1.Router)();
exports.routes.get('/products-all', new controller_product_1.ControllerProducts().GetAllProductsController);
