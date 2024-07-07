"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = __importDefault(require("./parser"));
console.log('Welcome to the Hack Assembler');
let path = process.argv[2];
let parser = new parser_1.default();
parser.parse(path);
//# sourceMappingURL=main.js.map