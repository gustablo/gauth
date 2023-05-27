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
exports.register = void 0;
const database_1 = require("../infra/database");
const register = (business, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { schemas: { User } } = (0, database_1.useDatabase)();
    const created = yield User.create({
        business: business.uuid,
        password: user.password,
        username: user.username,
        refId: user.refId,
    });
    return {
        uuid: created._id.toString(),
        username: created.username,
        refId: created.refId,
    };
});
exports.register = register;
