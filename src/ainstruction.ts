import Instruction from "./instruction";
import Symbol from "./symbol";
import ParseError from "./parse-error";
import Decimal from "./decimal";

export default class AInstruction extends Instruction {
    start: boolean;
    decimal: Decimal;
    symbol: Symbol;
    isSymbol: boolean;

    // Assume a string that begins with @
    constructor(text: string, lineNumber: number, startColumn: number) {
        super(lineNumber, startColumn);
        this.start = false;
        
        this.isSymbol = false;

        if (text.length < 2) {
            this.errors.push(new ParseError('A-instruction cannot be zero length', lineNumber, startColumn));
            return;
        }
        
        if (Symbol.legalFirstPattern.test(text[1])) {
            this.isSymbol = true;
            this.symbol = new Symbol(text.substring(1))
            this.length = this.symbol.length + 1;

            if (this.length < text.length) {
                this.errors.push(new ParseError('Invalid character after symbol', lineNumber, this.length));
            }
        } else if (Decimal.legalCharactersPattern.test(text[1])) {
            this.decimal = new Decimal(text.substring(1), lineNumber, startColumn + 1);
            this.length = this.decimal.length + 1

            if (this.length < text.length) {
                this.errors.push(new ParseError('Invalid character after decimal', lineNumber, this.length));
            }
        }
    }
}