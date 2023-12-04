"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorOnCreatePayment = void 0;
class ErrorOnCreatePayment extends Error {
    constructor() {
        super('serviço de pagamento indisponível');
    }
}
exports.ErrorOnCreatePayment = ErrorOnCreatePayment;
