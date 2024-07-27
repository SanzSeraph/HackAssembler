import SymbolTable from './symbolTable';
import AInstruction from './ainstruction';
import Instruction from './instruction';
import Label from './label';
import CInstruction from './cinstruction';
import ParseError from './parse-error';
import SourceFile from './file';
import { whitespace } from './whitespace';

export default class Parser {
    public errors: ParseError[];

    private _file: SourceFile;
    private _instructions: Instruction[];
    
    private _currentRealLine: number;

    constructor(file: SourceFile) {
        this._file = file;
        this.errors = [];
    }
    
    async parse() {
        await this.parseLines();
        
        this._instructions.forEach((ins, index) => {
            this.errors.push(...ins.errors);
        });

        if (this.errors.length > 0) {
            for (let i = 0; i < this.errors.length; i++) {
                let error = this.errors[i];
    
                console.log(`${error.message}: ${error.line}, ${error.column}`);
            }
        } 

        return this._instructions;
    }

    private async parseLines() {
        console.log('Parsing file');

        await this._file.openRead();

        this._instructions = [];

        for (let i = 1; i < this._file.numberOfLines + 1; i++) {
            this.parseLine(this._file.readLine(), i);
        }
    }

    private parseLine(line: string, lineNumber: number) {
        let instruction: Instruction;
        let currentColumn = 0;

        let carriageReturnIndex = line.lastIndexOf('\r');

        if (carriageReturnIndex > -1) {
            line = line.substring(0, carriageReturnIndex);
        }

        if (line.length == 0) {
            return;
        }

        for (let currentColumn = 0; currentColumn < line.length; currentColumn++) {
            let character = line[currentColumn];

            if (whitespace.includes(character)) {
                continue;
            }

            if (character == '@') {
                instruction = new AInstruction(line.substring(currentColumn), lineNumber, currentColumn);
                this._instructions.push(instruction);
                break;
                
            } else if (character == '(') {
                instruction = new Label(line.substring(currentColumn), lineNumber, currentColumn);
                this._instructions.push(instruction);
                break;
            } else if (character == '/') {
                let peek = line[currentColumn + 1];

                if (peek == '/') {
                    break;
                } else {
                    this.errors.push(new ParseError('Orphaned /', lineNumber, currentColumn));
                }
            } else {
                instruction = new CInstruction(line.substring(currentColumn), lineNumber, currentColumn);
                this._instructions.push(instruction);
                break;
            }   
        }
    }

    
}