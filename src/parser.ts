import SymbolTable from './symbolTable';
import AInstruction from './ainstruction';
import Instruction from './instruction';
import Label from './label';
import Comment from './comment';
import CInstruction from './cinstruction';
import ParseError from './parse-error';
import File from './file';
import { whitespace } from './whitespace';

export default class Parser {
    public errors: ParseError[];

    private _file: File;
    private _instructions: Instruction[];
    private _symbolTable: SymbolTable;
    private _currentRealLine: number;

    constructor(file: File) {
        this._file = file;
    }
    
    async parse() {
        await this.parseLines();
        
        this._instructions.forEach((ins, index) => {
            this.errors.push(...ins.errors);
        });
    }

    private async parseLines() {
        console.log('Parsing file');

        await this._file.openRead();

        this._instructions = [];

        for (let i = 1; i < this._file.numberOfLines + 1; i++) {
            this.parseLine(this._file.readLine(), 1);
        }
    }

    private parseLine(line: string, lineNumber: number) {
        let instruction: Instruction;
        let currentColumn = 0;

        if (line.length == 0) {
            return;
        }

        for (let currentColumn = 0; currentColumn < line.length; currentColumn++) {
            let character = line[currentColumn];

            if (whitespace.includes(character)) {
                continue;
            }

            if (character == '@') {
                instruction = new AInstruction(line.substring(currentColumn), lineNumber);
                currentColumn += instruction.length;
                break;
            } else if (character == '(') {
                instruction = new Label(line.substring(currentColumn), lineNumber);
                currentColumn += instruction.length;
            } else if (character == '/') {
                let peek = line[currentColumn + 1];

                if (peek == '/') {
                    break;
                } else {
                    this.errors.push(new ParseError('Orphaned /', lineNumber, currentColumn));
                }
            } else {
                instruction = new CInstruction(line.substring(currentColumn), lineNumber);
            }
        }

        if (currentColumn < line.length) {
            this.errors.push(new ParseError('Invalid characters after operation.', lineNumber, currentColumn));
        }

        this._instructions.push(instruction);
    }
}