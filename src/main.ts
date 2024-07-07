import Parser from './parser';

console.log('Welcome to the Hack Assembler');

let path = process.argv[2];
let parser = new Parser()

parser.parse(path);