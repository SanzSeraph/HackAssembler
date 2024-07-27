import SymbolTable from './symbolTable';
import Instruction from './instruction';
import Label from './label';
import AInstruction from './ainstruction';
import CInstruction from './cinstruction';
import SourceFile from './file';

export default class Translator {
    private _symbolTable: SymbolTable;
    private _outputFile: SourceFile;
    private _instructions: Instruction[];
    private _compTranslationTable: { [key: string]: string } = {
        '0' :   '0101010',
        '1' :   '0111111',
        '-1':   '0111010',
        'D' :   '0001100',
        'A' :   '0110000',
        '!D':   '0001101',
        '!A':   '0110001',
        '-D':   '0001111',
        '-A':   '0110011',
        'D+1':  '0011111',
        'A+1':  '0110111',
        'D-1':  '0001110',
        'A-1':  '0110010',
        'D+A':  '0000010',
        'D-A':  '0010011',
        'A-D':  '0000111',
        'D&A':  '0000000',
        'D|A':  '0010101',
        'M':    '1110000',
        '!M':   '1110001',
        '-M':   '1110011',
        'M+1':  '1110111',
        'M-1':  '1110010',
        'D+M':  '1000010',
        'D-M':  '1010011',
        'M-D':  '1000111',
        'D&M':  '1000000',
        'D|M':  '1010101'
    };

    private _destTranslationTable: { [key: string]: string } = {
        'M': '001',
        'D': '010',
        'MD': '011',
        'A': '100',
        'AM': '101',
        'AD': '110',
        'AMD': '111'
    };

    private _jumpTranslationTable: { [key: string]: string } = {
        'JGT': '001',
        'JEQ': '010',
        'JGE': '011',
        'JLT': '100',
        'JNE': '101',
        'JLE': '110',
        'JMP': '111'
    };

    constructor(instructions: Instruction[], outputFile: SourceFile) {
        this._symbolTable = new SymbolTable();
        this._instructions = instructions;
        this._outputFile = outputFile;
    }

    addLabelsToSymbolTable() {
        let address = 0;

        this._instructions.forEach((ins, index) => {
            if (ins instanceof Label && !this._symbolTable.containsSymbol(ins.symbol.value)) {
                this._symbolTable.addLabelSymbol(ins.symbol.value, address);
            } else {
                address++;
            }
        });
    }

    async translateProgram() {
        await this._outputFile.openWrite();

        this.addLabelsToSymbolTable();
        this._instructions.filter(ins => !(ins instanceof Label)).forEach((ins, index) => {
            if (ins instanceof AInstruction) {
                let bin = '0';

                if (ins.isSymbol) {
                    if (!this._symbolTable.containsSymbol(ins.symbol.value)) {
                        this._symbolTable.addSymbol(ins.symbol.value);
                    }

                    let address = this._symbolTable.getSymbolAddress(ins.symbol.value);

                    bin += new Number(address).toString(2).padStart(15, '0');
                } else {
                    bin += new Number(ins.decimal.value).toString(2).padStart(15, '0');
                }

                this._outputFile.writeLine(bin);
            } else if (ins instanceof CInstruction) {
                let bin = '111';
                
                bin += this._compTranslationTable[ins.comp];

                if (ins.dest.length) {
                    let dest = ins.dest.join('');

                    bin += this._destTranslationTable[dest];
                } else {
                    bin += '000';
                }

                if (ins.jump && ins.jump.length) {
                    bin += this._jumpTranslationTable[ins.jump];
                } else {
                    bin += '000';
                }

                this._outputFile.writeLine(bin);
            }
        });

        return await this._outputFile.flush();
    }
}