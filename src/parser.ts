import { FileHandle, open } from 'node:fs/promises';
import fs from 'node:fs';
import path from 'node:path';
import SymbolTable from './symbolTable';
import AInstruction from './ainstruction';
import Instruction from './instruction';
import Label from './label';
import Comment from './comment';
import CInstruction from './cinstruction';
import os from 'node:os';

export default class Parser {
    private _file: FileHandle;
    private _lines: string[];
    private _instructions: Instruction[];
    private _symbolTable: SymbolTable;
    private _currentRealLine: number;

    async parse(filePath: string) {
        try {
            this._file = await open(filePath, 'r');
        }
        catch (ex) {
            if (ex.code === 'ERR_INVALID_ARG_TYPE') {
                console.log(`Please provide an .asm file to process`);
            } else if (ex.code == 'ENOENT') {
                console.log(`File ${filePath} does not exist.`);
            } else {
                throw ex;
            }
            
            return;
        }

        await this.parseLines();
        
        this._instructions.forEach((ins, index) => {
            ins.errors.forEach(pe => console.log(`${pe.message} (${index}, ${pe.column})`));
        });
    }

    private async parseLines() {
        console.log('Parsing file');

        let contents = await this._file.readFile({
            encoding: 'utf-8'
        });

        let lineSeparator = os.EOL;

        this._lines = contents.split(lineSeparator);
        this._instructions = [];

        for (let i = 0; i < this._lines.length; i++) {
            this.parseLine(this._lines[i], i);
        }

        console.log('No errors found.');
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