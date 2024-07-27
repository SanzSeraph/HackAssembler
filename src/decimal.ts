import ParseError from "./parse-error";

export default class Decimal {
    static legalCharactersPattern: RegExp;

    value: string;
    currentColumn: number;
    errors: ParseError[];
    
    static {
        this.legalCharactersPattern = RegExp('[0-9]');
    }

    // Assume first character is the first digit
    constructor(line: string, lineNumber: number, startColumn: number) {
        this.value = '';
        this.errors = [];

        for (this.currentColumn = 0; this.currentColumn < line.length; this.currentColumn++) {
            let character = line[this.currentColumn];

            if (Decimal.legalCharactersPattern.test(character)) {
                this.value += character;
            } else {
                this.errors.push(new ParseError(`${character} is not a valid decimal digit`, lineNumber, startColumn + this.currentColumn))
            }
        }
    }

    get length() {
        return this.value.length;
    }
}