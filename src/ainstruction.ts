import Instruction from "./instruction";
import Symbol from "./symbol";
import { whitespace } from "./whitespace";
import ParseError from "./parse-error";
import Decimal from "./decimal";

export default class AInstruction extends Instruction {
    start: boolean;
    decimal: Decimal;
    symbol: Symbol;
    currentColumn: number;
    isSymbol: boolean;

    constructor(line: string, lineNumber: number) {
        super(lineNumber);
        this.start = false;
        this.currentColumn = 0;
        this.isSymbol = false;

        for (this.currentColumn; this.currentColumn < line.length; this.currentColumn++) {
            let character = line[this.currentColumn];

            if (!this.start) {
                if (whitespace.includes(character)) {
                    continue;
                } else if (character === '@') {
                    this.start = true;
                    let peek = line[this.currentColumn + 1];

                    if (Symbol.legalFirst.includes(peek)) {
                        this.isSymbol = true;
                    }
                } else {
                    this.errors.push(new ParseError(`A instructions must begin with a @`, this.lineNumber, this.currentColumn));
                }
            } else {
                if (this.isSymbol) {
                    this.symbol = new Symbol(line.substring(this.currentColumn));
                    this.currentColumn = this.symbol.currentColumn + 1;
                } else {
                    this.decimal = new Decimal(line.substring(this.currentColumn), this.lineNumber);
                    this.currentColumn = this.decimal.currentColumn + 1;
                }
            }
        }
    }
}