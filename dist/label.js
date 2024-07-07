"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = __importDefault(require("./instruction"));
const parse_error_1 = __importDefault(require("./parse-error"));
const whitespace_1 = require("./whitespace");
const symbol_1 = __importDefault(require("./symbol"));
class Label extends instruction_1.default {
    symbol;
    currentColumn;
    start;
    end;
    constructor(line, lineNumber) {
        super(lineNumber);
        for (this.currentColumn = 0; this.currentColumn < line.length; this.currentColumn++) {
            let character = line[this.currentColumn];
            if (!this.start) {
                if (whitespace_1.whitespace.includes(character)) {
                    continue;
                }
                else if (character === '(') {
                    this.start = true;
                }
                else {
                    this.errors.push(new parse_error_1.default('Non-whitespace characters are not allowed outside of a label.', this.currentColumn));
                }
            }
            else if (this.end) {
                this.errors.push(new parse_error_1.default('No characters are allowed outside of a label', this.currentColumn));
            }
            else {
                if (character === ')') {
                    this.end = this.currentColumn;
                }
                else {
                    this.symbol = new symbol_1.default(line.substring(this.currentColumn, line.indexOf(')')));
                    this.currentColumn = this.symbol.currentColumn + 1;
                }
            }
        }
    }
}
exports.default = Label;
//# sourceMappingURL=label.js.map