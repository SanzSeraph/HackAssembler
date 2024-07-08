import fsPromises from "node:fs/promises";
import os from "node:os";
export default class File {
    _path;
    _fileHandle;
    _contents;
    _lines;
    currentLine = 0;
    constructor(path) {
        this._path = path;
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
            }
            else if (ex.code == 'ENOENT') {
                console.log(`File ${this._path} does not exist.`);
            }
            else {
                throw ex;
            }
            return;
        }
        if (this._contents == null) {
            this._contents = await this._fileHandle.readFile({ encoding: 'utf-8' });
        }
        return Promise.resolve();
    }
    readLine() {
        if (this._lines == null) {
            this._lines = this._contents.split(os.EOL);
        }
        return this._lines[this.currentLine++];
    }
}
//# sourceMappingURL=file.js.map