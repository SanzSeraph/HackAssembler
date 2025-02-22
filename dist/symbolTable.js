"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SymbolTable {
    _table = {
        'SP': 0,
        'LCL': 1,
        'THIS': 3,
        'ARG': 2,
        'THAT': 4,
        'R0': 0,
        'R1': 1,
        'R2': 2,
        'R3': 3,
        'R4': 4,
        'R5': 5,
        'R6': 6,
        'R7': 7,
        'R8': 8,
        'R9': 9,
        'R10': 10,
        'R11': 11,
        'R12': 12,
        'R13': 13,
        'R14': 14,
        'R15': 15,
        'SCREEN': 16384,
        'KBD': 24576
    };
    _nextFreeVariableAddress = 16;
    addSymbol(symbol) {
        this._table[symbol] = this._nextFreeVariableAddress++;
    }
    addLabelSymbol(symbol, address) {
        this._table[symbol] = address;
    }
    containsSymbol(symbol) {
        return Object.keys(this._table).includes(symbol);
    }
    getSymbolAddress(symbol) {
        return this._table[symbol];
    }
}
exports.default = SymbolTable;
//# sourceMappingURL=symbolTable.js.map