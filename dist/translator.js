"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const symbolTable_1 = __importDefault(require("./symbolTable"));
const label_1 = __importDefault(require("./label"));
const ainstruction_1 = __importDefault(require("./ainstruction"));
const cinstruction_1 = __importDefault(require("./cinstruction"));
class Translator {
    _symbolTable;
    _outputFile;
    _instructions;
    _compTranslationTable = {
        '0': '0101010',
        '1': '0111111',
        '-1': '0111010',
        'D': '0001100',
        'A': '0110000',
        '!D': '0001101',
        '!A': '0110001',
        '-D': '0001111',
        '-A': '0110011',
        'D+1': '0011111',
        'A+1': '0110111',
        'D-1': '0001110',
        'A-1': '0110010',
        'D+A': '0000010',
        'D-A': '0010011',
        'A-D': '0000111',
        'D&A': '0000000',
        'D|A': '0010101',
        'M': '1110000',
        '!M': '1110001',
        '-M': '1110011',
        'M+1': '1110111',
        'M-1': '1110010',
        'D+M': '1000010',
        'D-M': '1010011',
        'M-D': '1000111',
        'D&M': '1000000',
        'D|M': '1010101'
    };
    _destTranslationTable = {
        'M': '001',
        'D': '010',
        'MD': '011',
        'A': '100',
        'AM': '101',
        'AD': '110',
        'AMD': '111'
    };
    _jumpTranslationTable = {
        'JGT': '001',
        'JEQ': '010',
        'JGE': '011',
        'JLT': '100',
        'JNE': '101',
        'JLE': '110',
        'JMP': '111'
    };
    constructor(instructions, outputFile) {
        this._symbolTable = new symbolTable_1.default();
        this._instructions = instructions;
        this._outputFile = outputFile;
    }
    addLabelsToSymbolTable() {
        let address = 0;
        this._instructions.forEach((ins, index) => {
            if (ins instanceof label_1.default && !this._symbolTable.containsSymbol(ins.symbol.value)) {
                this._symbolTable.addLabelSymbol(ins.symbol.value, address);
            }
            else {
                address++;
            }
        });
    }
    async translateProgram() {
        await this._outputFile.openWrite();
        this.addLabelsToSymbolTable();
        this._instructions.filter(ins => !(ins instanceof label_1.default)).forEach((ins, index) => {
            if (ins instanceof ainstruction_1.default) {
                let bin = '0';
                if (ins.isSymbol) {
                    if (!this._symbolTable.containsSymbol(ins.symbol.value)) {
                        this._symbolTable.addSymbol(ins.symbol.value);
                    }
                    let address = this._symbolTable.getSymbolAddress(ins.symbol.value);
                    bin += new Number(address).toString(2).padStart(15, '0');
                }
                else {
                    bin += new Number(ins.decimal.value).toString(2).padStart(15, '0');
                }
                this._outputFile.writeLine(bin);
            }
            else if (ins instanceof cinstruction_1.default) {
                let bin = '111';
                bin += this._compTranslationTable[ins.comp];
                if (ins.dest.length) {
                    let dest = ins.dest.join('');
                    bin += this._destTranslationTable[dest];
                }
                else {
                    bin += '000';
                }
                if (ins.jump && ins.jump.length) {
                    bin += this._jumpTranslationTable[ins.jump];
                }
                else {
                    bin += '000';
                }
                this._outputFile.writeLine(bin);
            }
        });
        return await this._outputFile.flush();
    }
}
exports.default = Translator;
//# sourceMappingURL=translator.js.map