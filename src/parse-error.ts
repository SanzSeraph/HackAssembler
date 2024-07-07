export default class ParseError {
    column: number;
    message: string;

    constructor(message: string, column: number) {
        this.message = message;
        this.column = this.column;
    }
}