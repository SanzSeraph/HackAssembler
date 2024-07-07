import Instruction from "./instruction";

export default class Comment extends Instruction {
    constructor(line: string, lineNumber: number) {
        super(lineNumber);
    }
}