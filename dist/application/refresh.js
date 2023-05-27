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
exports.refresh = void 0;
const database_1 = require("../infra/database");
const jwt_1 = require("../infra/jwt");
const refresh = (business, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const { verify, sign } = (0, jwt_1.useJwt)(business.apiKey);
    const { schemas } = (0, database_1.useDatabase)();
    const verified = yield verify(refreshToken);
    const user = yield schemas.User.findById(verified.uuid);
    if (!user)
        throw new Error('User not found');
    const newToken = sign({ username: user.username, uuid: user._id.toString(), refId: user.refId });
    return {
        token: newToken,
    };
});
exports.refresh = refresh;
