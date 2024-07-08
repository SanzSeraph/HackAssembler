import AInstruction from './ainstruction';
import Instruction from './instruction';
import Label from './label';
import Comment from './comment';
import CInstruction from './cinstruction';
export default class Parser {
    errors;
    _file;
    _instructions;
    _symbolTable;
    _currentRealLine;
    constructor(file) {
        this._file = file;
    }
    async parse() {
        await this.parseLines();
        this._instructions.forEach((ins, index) => {
            this.errors.push(...ins.errors);
        });
    }
    async parseLines() {
        console.log('Parsing file');
        await this._file.openRead();
        this._instructions = [];
        for (let i = 1; i < this._file.numberOfLines + 1; i++) {
            this.parseLine(this._file.readLine(), 1);
        }
    }
    parseLine(line, lineNumber) {
        let trimmed = line.trim();
        let instruction;
        if (trimmed.startsWith('@')) {
            instruction = new AInstruction(line, lineNumber);
        }
        else if (trimmed.startsWith('(')) {
            instruction = new Label(line, lineNumber);
        }
        else if (trimmed.startsWith('//')) {
            instruction = new Comment(line, lineNumber);
        }
        else if (trimmed == '') {
            instruction = new Instruction(lineNumber);
        }
        else {
            instruction = new CInstruction(line, lineNumber);
        }
        this._instructions.push(instruction);
    }
}
//# sourceMappingURL=parser.js.map