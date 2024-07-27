"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParseError {
    line;
    column;
    message;
    constructor(message, line, column) {
        this.line = line;
        this.message = message;
        this.column = column;
    }
}
exports.default = ParseError;
//# sourceMappingURL=parse-error.js.map