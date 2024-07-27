import { FileHandle } from "node:fs/promises";
import fsPromises from "node:fs/promises";
import { WriteStream } from "node:fs";
import os from "node:os";
import path from "node:path";

export default class SourceFile {
    private _path: string;
    private _fileHandle: FileHandle;
    private _contents: string;
    private _lines: string[];
    private currentLine: number = 0;

    constructor(path: string) {
        this._path = path;
        this._contents = '';
    }

    get numberOfLines() {
        return this._lines.length;
    }

    async openRead() {

        try {
            this._fileHandle = await fsPromises.open(this._path, 'r');
        }
        catch (ex) {
            if (ex.code === 'ERR_INVALID_ARG_TYPE') {
                console.log(`Please provide an .asm file to process`);
            } else if (ex.code == 'ENOENT') {
                console.log(`File ${this._path} does not exist.`);
            } else {
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
            this._fileHandle = await fsPromises.open(this._path, 'w');
        } catch (ex) {
            throw ex;
        }
    }

    writeLine(line: string) {
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