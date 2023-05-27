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
exports.authenticate = void 0;
const jwt_1 = require("../infra/jwt");
const database_1 = require("../infra/database");
const authenticate = (business, username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const { schemas } = (0, database_1.useDatabase)();
    const user = yield schemas.User.findOne({ business: business.uuid, username, password });
    if (!user)
        throw new Error('Incorrect Credentials');
    const { sign } = (0, jwt_1.useJwt)(business.apiKey);
    const token = sign({ username: user.username, uuid: user._id.toString(), refId: user.refId });
    const refreshToken = sign({ uuid: user._id.toString() }, '24h');
    return {
        refreshToken,
        token,
    };
});
exports.authenticate = authenticate;
