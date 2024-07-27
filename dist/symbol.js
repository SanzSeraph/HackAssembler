"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Symbol {
    static legalFirstPattern;
    static legalSubsequentPattern;
    value;
    errors;
    currentColumn;
    static {
        this.legalFirstPattern = new RegExp('[a-zA-Z_.$:]');
        this.legalSubsequentPattern = new RegExp('[a-zA-Z_.$:0-9]');
    }
    constructor(text) {
        this.errors = [];
        this.value = '';
        this.currentColumn = 0;
        for (this.currentColumn = 0; this.currentColumn < text.length; this.currentColumn++) {
            let character = text[this.currentColumn];
            if (this.currentColumn == 0 && Symbol.legalFirstPattern.test(character)) {
                this.value += character;
            }
            else if (this.currentColumn != 0 && Symbol.legalSubsequentPattern.test(character)) {
                this.value += character;
            }
            else {
                break;
            }
        }
    }
    get length() {
        return this.value.length;
    }
}
exports.default = Symbol;
//# sourceMappingURL=symbol.js.map