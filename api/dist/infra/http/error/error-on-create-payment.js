"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorOnCreatePayment = void 0;
class ErrorOnCreatePayment extends Error {
    constructor() {
        super('Error on create payment');
    }
}
exports.ErrorOnCreatePayment = ErrorOnCreatePayment;
