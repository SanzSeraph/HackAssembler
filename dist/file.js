"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("node:fs/promises"));
class SourceFile {
    _path;
    _fileHandle;
    _contents;
    _lines;
    currentLine = 0;
    constructor(path) {
        this._path = path;
        this._contents = '';
    }
    get numberOfLines() {
        return this._lines.length;
    }
    async openRead() {
        try {
            this._fileHandle = await promises_1.default.open(this._path, 'r');
        }
        catch (ex) {
            if (ex.code === 'ERR_INVALID_ARG_TYPE') {
                console.log(`Please provide an .asm file to process`);
            }
            else if (ex.code == 'ENOENT') {
                console.log(`File ${this._path} does not exist.`);
            }
            else {
                throw ex;
            }
            this._lines = [];
            return;
        }
        this._contents = await this._fileHandle.readFile({ encoding: 'utf-8' });
        this._lines = this._contents.split('\n');
        return Promise.resolve();
    }
    async openWrite() {
        try {
            this._fileHandle = await promises_1.default.open(this._path, 'w');
        }
        catch (ex) {
            throw ex;
        }
    }
    writeLine(line) {
        this._contents += line + '\n';
    }
    async flush() {
        return await this._fileHandle.writeFile(this._contents, {
            encoding: 'utf-8',
            flush: true
        });
    }
    close() {
        this._fileHandle.close();
    }
    readLine() {
        return this._lines[this.currentLine++];
    }
}
exports.default = SourceFile;
//# sourceMappingURL=file.js.map