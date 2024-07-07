"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = __importDefault(require("./instruction"));
const symbol_1 = __importDefault(require("./symbol"));
const whitespace_1 = require("./whitespace");
const parse_error_1 = __importDefault(require("./parse-error"));
const decimal_1 = __importDefault(require("./decimal"));
class AInstruction extends instruction_1.default {
    start;
    decimal;
    symbol;
    currentColumn;
    isSymbol;
    constructor(line, lineNumber) {
        super(lineNumber);
        this.start = false;
        this.currentColumn = 0;
        this.isSymbol = false;
        for (this.currentColumn; this.currentColumn < line.length; this.currentColumn++) {
            let character = line[this.currentColumn];
            if (!this.start) {
                if (whitespace_1.whitespace.includes(character)) {
                    continue;
                }
                else if (character === '@') {
                    this.start = true;
                    let peek = line[this.currentColumn + 1];
                    if (symbol_1.default.legalFirst.includes(peek)) {
                        this.isSymbol = true;
                    }
                }
                else {
                    this.errors.push(new parse_error_1.default(`A instructions must begin with a @`, this.currentColumn));
                }
            }
            else {
                if (this.isSymbol) {
                    this.symbol = new symbol_1.default(line.substring(this.currentColumn));
                    this.currentColumn = this.symbol.currentColumn + 1;
                }
                else {
                    this.decimal = new decimal_1.default(line.substring(this.currentColumn));
                    this.currentColumn = this.decimal.currentColumn + 1;
                }
            }
        }
    }
}
exports.default = AInstruction;
//# sourceMappingURL=ainstruction.js.map