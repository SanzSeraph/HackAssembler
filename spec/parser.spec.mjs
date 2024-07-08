import Parser from "../../src/parser";

describe('Parser', function() {
  it('returns label errors', function() {
    let file = jasmine.createSpyObj('File', [ 'openRead', 'readLine' ], [ 'numberOfLines' ]);

    file.openRead.and.returnValue(Promise.resolve());
    file.numberOfLines.and.returnValue(1);
    file.readLine.and.returnValue(' (LABEL)#');

    let parser = new Parser(file);

    parser.parse();

    expect(parser.errors[0].message).toContain('No characters are allowed outside of a label');
  });
});