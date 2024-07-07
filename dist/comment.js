"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = __importDefault(require("./instruction"));
class Comment extends instruction_1.default {
    constructor(line, lineNumber) {
        super(lineNumber);
    }
}
exports.default = Comment;
//# sourceMappingURL=comment.js.map