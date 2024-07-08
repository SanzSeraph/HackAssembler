import { FileHandle, open } from 'node:fs/promises';
import SymbolTable from './symbolTable';
import AInstruction from './ainstruction';
import Instruction from './instruction';
import Label from './label';
import Comment from './comment';
import CInstruction from './cinstruction';
import os from 'node:os';
import ParseError from './parse-error';
import File from './file';

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
        line.trim();

        let instruction: Instruction;

        if (line.startsWith('@')) {
            instruction = new AInstruction(line, lineNumber);
        } else if (line.startsWith('(')) {
            instruction = new Label(line, lineNumber);
        } else if (line.startsWith('//')) {
            instruction = new Comment(line, lineNumber);
        } else if (line == '') {
            instruction = new Instruction(lineNumber);
        } else {
            instruction = new CInstruction(line,  lineNumber);
        }

        this._instructions.push(instruction);
    }
}