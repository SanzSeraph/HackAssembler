"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = __importDefault(require("./instruction"));
const parse_error_1 = __importDefault(require("./parse-error"));
const symbol_1 = __importDefault(require("./symbol"));
class Label extends instruction_1.default {
    symbol;
    currentColumn;
    constructor(line, lineNumber, startColumn) {
        super(lineNumber, startColumn);
        if (line.indexOf(')') < 0) {
            this.errors.push(new parse_error_1.default('No matching ) for label', lineNumber, startColumn));
            return;
        }
        // Assume that first character is (
        this.symbol = new symbol_1.default(line.substring(1, line.indexOf(')')));
        this.length = this.symbol.length + 2;
        if (line.length > this.length) {
            this.errors.push(new parse_error_1.default('Invalid characters after label', lineNumber, this.length));
        }
    }
}
exports.default = Label;
//# sourceMappingURL=label.js.map