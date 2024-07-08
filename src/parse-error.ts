export default class ParseError {
    line: number;
    column: number;
    message: string;

    constructor(message: string, line: number, column: number) {
        this.line = line;
        this.message = message;
        this.column = column;
    }
}