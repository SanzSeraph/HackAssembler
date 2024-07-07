"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parse_error_1 = __importDefault(require("./parse-error"));
class Decimal {
    static legalCharacters;
    value;
    currentColumn;
    errors;
    static {
        this.legalCharacters = [];
        for (let i = 0; i < 10; i++) {
            this.legalCharacters.push(i.toString());
        }
    }
    constructor(line) {
        this.value = '';
        this.errors = [];
        for (this.currentColumn = 0; this.currentColumn < line.length; this.currentColumn++) {
            let character = line[this.currentColumn];
            if (Decimal.legalCharacters.includes(character)) {
                this.value += character;
            }
            else {
                this.errors.push(new parse_error_1.default(`${character} is not a valid decimal digit`, this.currentColumn));
            }
        }
    }
}
exports.default = Decimal;
//# sourceMappingURL=decimal.js.map