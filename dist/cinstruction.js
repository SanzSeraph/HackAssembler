"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = __importDefault(require("./instruction"));
const parse_error_1 = __importDefault(require("./parse-error"));
const whitespace_1 = require("./whitespace");
class CInstruction extends instruction_1.default {
    static legalDestination = ['A', 'D', 'M'];
    static legalComp = [
        'A[\w][+&|-][\w][DM1]',
        'D[\w][+&|-][\w][AM1]',
        'M[\w][+&|-][\w][AD1]',
        '-[\w][ADM1]',
        '![\w][ADM]',
        '[0-1]',
        '[ADM]',
    ];
    static legalJump = [
        'JGT',
        'JEQ',
        'JGE',
        'JLT',
        'JNE',
        'JLE',
        'JMP'
    ];
    dest;
    comp;
    jump;
    _currentColumn;
    _destinationSeparatorIndex;
    _jumpSeparatorIndex;
    constructor(line, lineNumber) {
        super(lineNumber);
        this.dest = [];
        this.comp = '';
        this.jump = '';
        this._currentColumn = 0;
        this._destinationSeparatorIndex = line.indexOf('=');
        this._jumpSeparatorIndex = line.indexOf(';');
        if (this._jumpSeparatorIndex > 0 && this._destinationSeparatorIndex > 0 && this._jumpSeparatorIndex > this._destinationSeparatorIndex) {
            this.errors.push(new parse_error_1.default('The destination specifier must come before the jump specifier.', this._jumpSeparatorIndex));
            return;
        }
        if (this._destinationSeparatorIndex > 0) {
            this.parseDestination(line);
        }
        this.parseOperation(line);
        if (this._jumpSeparatorIndex > 0) {
            this.parseJump(line);
        }
    }
    parseDestination(line) {
        for (this._currentColumn; this._currentColumn < line.length; this._currentColumn++) {
            let character = line[this._currentColumn];
            if (whitespace_1.whitespace.includes(character)) {
                continue;
            }
            if (character == '=') {
                this._currentColumn++;
                break;
            }
            else if (this.dest.includes(character)) {
                this.errors.push(new parse_error_1.default(`Destination ${character} has already been specified`, this._currentColumn));
            }
            else if (CInstruction.legalDestination.includes(character)) {
                this.dest.push(character);
            }
            else {
                this.errors.push(new parse_error_1.default(`${character} is not a legal destination specifier`, this._currentColumn));
            }
        }
    }
    parseOperation(line) {
        let compSegment = '';
        if (this._jumpSeparatorIndex > 0) {
            compSegment = line.substring(this._currentColumn, this._jumpSeparatorIndex);
        }
        else {
            compSegment = line.substring(this._currentColumn);
        }
        let result;
        for (let i = 0; i < CInstruction.legalComp.length; i++) {
            let regex = new RegExp(CInstruction.legalComp[i]);
            result = regex.exec(compSegment);
            if (result) {
                this._currentColumn = regex.lastIndex;
                break;
            }
        }
        if (!result) {
            this.errors.push(new parse_error_1.default(`${compSegment} is not a valid operation`, this._currentColumn));
        }
        this.comp = this.stripWhitespace(compSegment);
    }
    parseJump(line) {
        let jumpSegment = line.substring(this._jumpSeparatorIndex + 1).trim();
        if (!CInstruction.legalJump.includes(jumpSegment)) {
            this.errors.push(new parse_error_1.default(`Illegal jump specifier ${jumpSegment}`, this._currentColumn));
        }
        else {
            this.jump = jumpSegment;
        }
    }
    stripWhitespace(str) {
        let stripped = '';
        for (let i = 0; i < str.length; i++) {
            let character = str[i];
            if (whitespace_1.whitespace.includes(character)) {
                continue;
            }
            else {
                stripped += character;
            }
        }
        return stripped;
    }
}
exports.default = CInstruction;
//# sourceMappingURL=cinstruction.js.map