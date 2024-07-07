"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("node:fs/promises");
const ainstruction_1 = __importDefault(require("./ainstruction"));
const instruction_1 = __importDefault(require("./instruction"));
const label_1 = __importDefault(require("./label"));
const comment_1 = __importDefault(require("./comment"));
const cinstruction_1 = __importDefault(require("./cinstruction"));
const node_os_1 = __importDefault(require("node:os"));
class Parser {
    _file;
    _lines;
    _instructions;
    _symbolTable;
    _currentRealLine;
    async parse(filePath) {
        try {
            this._file = await (0, promises_1.open)(filePath, 'r');
        }
        catch (ex) {
            if (ex.code === 'ERR_INVALID_ARG_TYPE') {
                console.log(`Please provide an .asm file to process`);
            }
            else if (ex.code == 'ENOENT') {
                console.log(`File ${filePath} does not exist.`);
            }
            else {
                throw ex;
            }
            return;
        }
        await this.parseLines();
        this._instructions.forEach((ins, index) => {
            ins.errors.forEach(pe => console.log(`${pe.message} (${index}, ${pe.column})`));
        });
    }
    async parseLines() {
        console.log('Parsing file');
        let contents = await this._file.readFile({
            encoding: 'utf-8'
        });
        let lineSeparator = node_os_1.default.EOL;
        this._lines = contents.split(lineSeparator);
        this._instructions = [];
        for (let i = 0; i < this._lines.length; i++) {
            this.parseLine(this._lines[i], i);
        }
        console.log('No errors found.');
    }
    parseLine(line, lineNumber) {
        line.trim();
        let instruction;
        if (line.startsWith('@')) {
            instruction = new ainstruction_1.default(line, lineNumber);
        }
        else if (line.startsWith('(')) {
            instruction = new label_1.default(line, lineNumber);
        }
        else if (line.startsWith('//')) {
            instruction = new comment_1.default(line, lineNumber);
        }
        else if (line == '') {
            instruction = new instruction_1.default(lineNumber);
        }
        else {
            instruction = new cinstruction_1.default(line, lineNumber);
        }
        this._instructions.push(instruction);
    }
}
exports.default = Parser;
//# sourceMappingURL=parser.js.map