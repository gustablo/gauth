"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GAuth = void 0;
const authenticate_1 = require("./authenticate");
const register_1 = require("./register");
const refresh_1 = require("./refresh");
const verify_1 = require("./verify");
const database_1 = require("../infra/database");
const GAuth = (apiKey) => __awaiter(void 0, void 0, void 0, function* () {
    const { connect, schemas } = (0, database_1.useDatabase)();
    yield connect();
    const getBusinessByApiKey = () => __awaiter(void 0, void 0, void 0, function* () {
        const business = yield schemas.Business.findOne({ apiKey });
        if (!business)
            throw new Error('Invalid Api Key');
        return {
            uuid: business._id.toString(),
            apiKey: business.apiKey,
            name: business.name,
        };
    });
    const business = yield getBusinessByApiKey();
    return {
        authenticate(username, password) {
            return (0, authenticate_1.authenticate)(business, username, password);
        },
        refresh(refreshToken) {
            return (0, refresh_1.refresh)(business, refreshToken);
        },
        register(user) {
            return (0, register_1.register)(business, user);
        },
        verify(token) {
            return (0, verify_1.verify)(business, token);
        }
    };
});
exports.GAuth = GAuth;
