"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_1 = __importDefault(require("./file"));
const parser_1 = __importDefault(require("./parser"));
const translator_1 = __importDefault(require("./translator"));
console.log('Welcome to the Hack Assembler');
let path = process.argv[2];
let file = new file_1.default(path);
let parser = new parser_1.default(file);
parser.parse().then(async (instructions) => {
    let outputFile = new file_1.default('./output.hack');
    let translator = new translator_1.default(instructions, outputFile);
    await translator.translateProgram();
    outputFile.close();
});
//# sourceMappingURL=main.js.map