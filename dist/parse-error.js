export default class ParseError {
    line;
    column;
    message;
    constructor(message, line, column) {
        this.line = line;
        this.message = message;
        this.column = column;
    }
}
//# sourceMappingURL=parse-error.js.map