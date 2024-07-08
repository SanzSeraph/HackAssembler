import ParseError from "./parse-error";

export default class Instruction {
    length: number;
    startColumn: number;
    lineNumber: number;
    errors: ParseError[];

    constructor(lineNumber: number, startColumn: number) {
        this.length = 0;
        this.lineNumber = lineNumber;
        this.startColumn = startColumn;
        this.errors = [];
    }
}