import Instruction from "./instruction";
import ParseError from "./parse-error";
import { whitespace } from "./whitespace";
import Symbol from './symbol';

export default class Label extends Instruction {

    symbol: Symbol;
    currentColumn: number;
    
    constructor(line: string, lineNumber: number, startColumn: number) {
        super(lineNumber, startColumn);

        if (line.indexOf(')') < 0) {
            this.errors.push(new ParseError('No matching ) for label', lineNumber, startColumn));

            return;
        }

        // Assume that first character is (
        this.symbol = new Symbol(line.substring(1, line.indexOf(')')));
        this.length = this.symbol.length + 2;

        if (line.length > this.length) {
            this.errors.push(new ParseError('Invalid characters after label', lineNumber, this.length));
        }
    }
}