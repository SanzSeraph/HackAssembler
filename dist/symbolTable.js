"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SymbolTable {
    _table = {};
    constructor() {
        this.addSymbol('SP', 0);
        this.addSymbol('LCL', 1);
        this.addSymbol('ARG', 2);
        this.addSymbol('THIS', 3);
        this.addSymbol('THAT', 4);
        this.addSymbol('R0', 5);
        this.addSymbol('R1', 6);
        this.addSymbol('R2', 7);
        this.addSymbol('R3', 8);
        this.addSymbol('R4', 9);
        this.addSymbol('R5', 10);
        this.addSymbol('R6', 11);
        this.addSymbol('R7', 12);
        this.addSymbol('R8', 13);
        this.addSymbol('R9', 14);
        this.addSymbol('R10', 15);
        this.addSymbol('R11', 16);
        this.addSymbol('R12', 17);
        this.addSymbol('R13', 18);
        this.addSymbol('R14', 19);
        this.addSymbol('R15', 20);
        this.addSymbol('SCREEN', 21);
        this.addSymbol('KBD', 22);
    }
    addSymbol(symbol, address) {
        this._table[symbol] = address;
    }
    getSymbolAddress(symbol) {
        return this._table[symbol];
    }
}
exports.default = SymbolTable;
//# sourceMappingURL=symbolTable.js.map