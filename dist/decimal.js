"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parse_error_1 = __importDefault(require("./parse-error"));
class Decimal {
    static legalCharactersPattern;
    value;
    currentColumn;
    errors;
    static {
        this.legalCharactersPattern = RegExp('[0-9]');
    }
    // Assume first character is the first digit
    constructor(line, lineNumber, startColumn) {
        this.value = '';
        this.errors = [];
        for (this.currentColumn = 0; this.currentColumn < line.length; this.currentColumn++) {
            let character = line[this.currentColumn];
            if (Decimal.legalCharactersPattern.test(character)) {
                this.value += character;
            }
            else {
                this.errors.push(new parse_error_1.default(`${character} is not a valid decimal digit`, lineNumber, startColumn + this.currentColumn));
            }
        }
    }
    get length() {
        return this.value.length;
    }
}
exports.default = Decimal;
//# sourceMappingURL=decimal.js.map