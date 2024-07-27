"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = __importDefault(require("./instruction"));
const symbol_1 = __importDefault(require("./symbol"));
const parse_error_1 = __importDefault(require("./parse-error"));
const decimal_1 = __importDefault(require("./decimal"));
class AInstruction extends instruction_1.default {
    start;
    decimal;
    symbol;
    isSymbol;
    // Assume a string that begins with @
    constructor(text, lineNumber, startColumn) {
        super(lineNumber, startColumn);
        this.start = false;
        this.isSymbol = false;
        if (text.length < 2) {
            this.errors.push(new parse_error_1.default('A-instruction cannot be zero length', lineNumber, startColumn));
            return;
        }
        if (symbol_1.default.legalFirstPattern.test(text[1])) {
            this.isSymbol = true;
            this.symbol = new symbol_1.default(text.substring(1));
            this.length = this.symbol.length + 1;
            if (this.length < text.length) {
                this.errors.push(new parse_error_1.default('Invalid character after symbol', lineNumber, this.length));
            }
        }
        else if (decimal_1.default.legalCharactersPattern.test(text[1])) {
            this.decimal = new decimal_1.default(text.substring(1), lineNumber, startColumn + 1);
            this.length = this.decimal.length + 1;
            if (this.length < text.length) {
                this.errors.push(new parse_error_1.default('Invalid character after decimal', lineNumber, this.length));
            }
        }
    }
}
exports.default = AInstruction;
//# sourceMappingURL=ainstruction.js.map