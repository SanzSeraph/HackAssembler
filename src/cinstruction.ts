import Instruction from "./instruction";
import ParseError from "./parse-error";
import { whitespace } from "./whitespace";

export default class CInstruction extends Instruction {
    private static legalDestination = [ 
        'A', 
        'D', 
        'M'
    ];
    private static legalComp = [
        'A[\w]?[+&|-][\w]?[DM1]',
        'D[\w]?[+&|-][\w]?[AM1]',
        'M[\w]?[+&|-][\w]?[AD1]',
        '-[\w]?[ADM1]',
        '![\w]?[ADM]',
        '[0-1]',
        '[ADM]',
    ];
    private static legalJump = [
        'JGT',
        'JEQ',
        'JGE',
        'JLT',
        'JNE',
        'JLE',
        'JMP'
    ];
    
    dest: string[];
    comp: string;
    jump: string;

    private _currentColumn: number;
    private _destinationSeparatorIndex: number;
    private _jumpSeparatorIndex: number;

    constructor(line: string, lineNumber: number, currentColumn: number) {
        super(lineNumber, currentColumn);

        this.dest = [];
        this.comp = '';
        this.jump = '';
        this._currentColumn = 0;

        this._destinationSeparatorIndex = line.indexOf('=');
        this._jumpSeparatorIndex = line.indexOf(';');

        if (this._jumpSeparatorIndex > 0 && this._destinationSeparatorIndex > 0 && this._jumpSeparatorIndex > this._destinationSeparatorIndex) {
            this.errors.push(new ParseError('The destination specifier must come before the jump specifier.', this.lineNumber, this._jumpSeparatorIndex));

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

    private parseDestination(line: string) {
        for (this._currentColumn; this._currentColumn < line.length; this._currentColumn++) {
            let character = line[this._currentColumn];

            if (whitespace.includes(character)) {
                continue;
            }

            if (character == '=') {
                this._currentColumn++;
                break;
            } else if (this.dest.includes(character)) {
                this.errors.push(new ParseError(`Destination ${character} has already been specified`, this.lineNumber, this._currentColumn));
            } else if (CInstruction.legalDestination.includes(character)) {
                this.dest.push(character);
            } else {
                this.errors.push(new ParseError(`${character} is not a legal destination specifier`, this.lineNumber, this._currentColumn));
            }
        }
    }

    private parseOperation(line: string) {
        let compSegment = '';

        if (this._jumpSeparatorIndex > 0) {
            compSegment = line.substring(this._currentColumn, this._jumpSeparatorIndex);
        } else {
            compSegment = line.substring(this._currentColumn);
        }

        let result: RegExpExecArray;
        
        for (let i = 0; i < CInstruction.legalComp.length; i ++) {
            let regex = new RegExp(CInstruction.legalComp[i]);

            result = regex.exec(compSegment);

            if (result) {
                this._currentColumn += regex.lastIndex;
                break;
            }
        }

        if (!result) {
            this.errors.push(new ParseError(`${compSegment} is not a valid operation`, this.lineNumber, this._currentColumn));
        }

        this.comp = this.stripWhitespace(compSegment);
    }

    private parseJump(line: string) {
        let jumpSegment = line.substring(this._jumpSeparatorIndex + 1).trim();

        if (!CInstruction.legalJump.includes(jumpSegment)) {
            this.errors.push(new ParseError(`Illegal jump specifier ${jumpSegment}`, this.lineNumber, this._currentColumn));
        } else {
            this.jump = jumpSegment;
            this._currentColumn = this._jumpSeparatorIndex + 3;
        }
    }

    private stripWhitespace(str: string) {
        let stripped = '';

        for (let i = 0; i < str.length; i ++) {
            let character = str[i];

            if (whitespace.includes(character)) {
                continue;
            } else {
                stripped += character;
            }
        }

        return stripped;
    }
}