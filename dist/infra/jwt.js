"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sign = (secret) => (payload, expiresIn = '15m') => jsonwebtoken_1.default.sign(payload, secret, { expiresIn });
const verify = (secret) => (token) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
            if (err)
                return reject(err);
            return resolve(decoded);
        });
    });
};
const useJwt = (secret) => {
    return { sign: sign(secret), verify: verify(secret) };
};
exports.useJwt = useJwt;
