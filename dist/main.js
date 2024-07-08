import AssemblyFile from './file';
import Parser from './parser';
console.log('Welcome to the Hack Assembler');
let path = process.argv[2];
let file = new AssemblyFile(path);
let parser = new Parser(file);
parser.parse();
if (parser.errors?.length) {
    parser.errors.forEach(err => {
        console.log(err);
    });
}
//# sourceMappingURL=main.js.map