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
exports.createTimer = void 0;
const User = require('../models/user');
function createTimer(fair, user) {
    const timer = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
        const bal = user.balance - fair;
        user.balance = bal;
        yield user.save();
    }), 1000 * 60 * 60);
    return timer;
}
exports.createTimer = createTimer;
;
