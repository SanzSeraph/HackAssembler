import ParseError from "./parse-error";
export default class Decimal {
    static legalCharacters;
    value;
    currentColumn;
    errors;
    static {
        this.legalCharacters = [];
        for (let i = 0; i < 10; i++) {
            this.legalCharacters.push(i.toString());
        }
    }
    constructor(line, lineNumber) {
        this.value = '';
        this.errors = [];
        for (this.currentColumn = 0; this.currentColumn < line.length; this.currentColumn++) {
            let character = line[this.currentColumn];
            if (Decimal.legalCharacters.includes(character)) {
                this.value += character;
            }
            else {
                this.errors.push(new ParseError(`${character} is not a valid decimal digit`, lineNumber, this.currentColumn));
            }
        }
    }
}
//# sourceMappingURL=decimal.js.map