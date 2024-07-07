import ParseError from "./parse-error";

export default class Instruction {
    lineNumber: number;
    errors: ParseError[];

    constructor(lineNumber: number) {
        this.lineNumber = lineNumber;
        this.errors = [];
    }
}