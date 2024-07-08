export default class Symbol {
    static legalFirst;
    static legalSubsequent;
    value;
    errors;
    currentColumn;
    static {
        this.legalFirst = [];
        this.legalFirst.push(...[
            'a',
            'b',
            'c',
            'd',
            'e',
            'f',
            'g',
            'h',
            'i',
            'j',
            'k',
            'l',
            'm',
            'n',
            'o',
            'p',
            'q',
            'r',
            's',
            't',
            'u',
            'v',
            'w',
            'x',
            'y',
            'z',
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H',
            'I',
            'J',
            'K',
            'L',
            'M',
            'N',
            'O',
            'P',
            'Q',
            'R',
            'S',
            'T',
            'U',
            'V',
            'W',
            'X',
            'Y',
            'Z',
            '_',
            '.',
            '$',
            ':'
        ]);
        this.legalSubsequent = this.legalFirst.concat(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']);
    }
    constructor(text) {
        this.errors = [];
        this.value = '';
        this.currentColumn = 0;
        for (this.currentColumn = 0; this.currentColumn < text.length; this.currentColumn++) {
            let character = text[this.currentColumn];
            if (this.currentColumn == 0 && Symbol.legalFirst.includes(character)) {
                this.value += character;
            }
            else if (this.currentColumn != 0 && Symbol.legalSubsequent.includes(character)) {
                this.value += character;
            }
            else {
                break;
            }
        }
    }
    get length() {
        return this.value.length;
    }
}
//# sourceMappingURL=symbol.js.map