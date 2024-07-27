import SourceFile from './file';
import Parser from './parser';
import Translator from './translator';

console.log('Welcome to the Hack Assembler');

let path = process.argv[2];
let file = new SourceFile(path)

let parser = new Parser(file);

parser.parse().then(async instructions => {
    let outputFile = new SourceFile('./output.hack');
    let translator = new Translator(instructions, outputFile);

    await translator.translateProgram();
    outputFile.close();
});

