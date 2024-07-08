import Instruction from "./instruction";
import ParseError from "./parse-error";
import { whitespace } from "./whitespace";
import Symbol from './symbol';
export default class Label extends Instruction {
    symbol;
    currentColumn;
    start;
    end;
    constructor(line, lineNumber) {
        super(lineNumber);
        for (this.currentColumn = 0; this.currentColumn < line.length; this.currentColumn++) {
            let character = line[this.currentColumn];
            if (!this.start) {
                if (whitespace.includes(character)) {
                    continue;
                }
                else if (character === '(') {
                    this.start = true;
                }
                else {
                    this.errors.push(new ParseError('Non-whitespace characters are not allowed outside of a label.', this.lineNumber, this.currentColumn));
                }
            }
            else if (this.end) {
                this.errors.push(new ParseError('No characters are allowed outside of a label', this.lineNumber, this.currentColumn));
            }
            else {
                if (character === ')') {
                    this.end = this.currentColumn;
                }
                else {
                    this.symbol = new Symbol(line.substring(this.currentColumn, line.indexOf(')')));
                    this.currentColumn = this.symbol.currentColumn + 1;
                }
            }
        }
    }
}
//# sourceMappingURL=label.js.map