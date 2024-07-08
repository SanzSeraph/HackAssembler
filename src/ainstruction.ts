import Instruction from "./instruction";
import Symbol from "./symbol";
import ParseError from "./parse-error";
import Decimal from "./decimal";

export default class AInstruction extends Instruction {
    start: boolean;
    decimal: Decimal;
    symbol: Symbol;
    currentColumn: number;
    isSymbol: boolean;

    // Assume a string that begins with @
    constructor(line: string, lineNumber: number, startColumn: number) {
        super(lineNumber, startColumn);
        this.start = false;
        this.currentColumn = 1;
        this.isSymbol = false;

        if (line.length < 2) {
            this.errors.push(new ParseError('A-instruction cannot be zero length', lineNumber, startColumn));
            return;
        }
        
        for (this.currentColumn; this.currentColumn < line.length; this.currentColumn++) {
            let character = line[this.currentColumn];

            if (Symbol.legalFirst.includes(character)) {
                this.symbol = new Symbol(line.substring(this.currentColumn));
                
            }
            if (!this.start) {
                if (character === '@') {
                    this.start = true;
                    let peek = line[this.currentColumn + 1];

                    if (Symbol.legalFirst.includes(peek)) {
                        
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