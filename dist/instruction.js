"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Instruction {
    length;
    startColumn;
    lineNumber;
    errors;
    constructor(lineNumber, startColumn) {
        this.length = 0;
        this.lineNumber = lineNumber;
        this.startColumn = startColumn;
        this.errors = [];
    }
}
exports.default = Instruction;
//# sourceMappingURL=instruction.js.map