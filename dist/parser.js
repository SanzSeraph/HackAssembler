"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ainstruction_1 = __importDefault(require("./ainstruction"));
const label_1 = __importDefault(require("./label"));
const cinstruction_1 = __importDefault(require("./cinstruction"));
const parse_error_1 = __importDefault(require("./parse-error"));
const whitespace_1 = require("./whitespace");
class Parser {
    errors;
    _file;
    _instructions;
    _currentRealLine;
    constructor(file) {
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
    async parseLines() {
        console.log('Parsing file');
        await this._file.openRead();
        this._instructions = [];
        for (let i = 1; i < this._file.numberOfLines + 1; i++) {
            this.parseLine(this._file.readLine(), i);
        }
    }
    parseLine(line, lineNumber) {
        let instruction;
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
            if (whitespace_1.whitespace.includes(character)) {
                continue;
            }
            if (character == '@') {
                instruction = new ainstruction_1.default(line.substring(currentColumn), lineNumber, currentColumn);
                this._instructions.push(instruction);
                break;
            }
            else if (character == '(') {
                instruction = new label_1.default(line.substring(currentColumn), lineNumber, currentColumn);
                this._instructions.push(instruction);
                break;
            }
            else if (character == '/') {
                let peek = line[currentColumn + 1];
                if (peek == '/') {
                    break;
                }
                else {
                    this.errors.push(new parse_error_1.default('Orphaned /', lineNumber, currentColumn));
                }
            }
            else {
                instruction = new cinstruction_1.default(line.substring(currentColumn), lineNumber, currentColumn);
                this._instructions.push(instruction);
                break;
            }
        }
    }
}
exports.default = Parser;
//# sourceMappingURL=parser.js.map