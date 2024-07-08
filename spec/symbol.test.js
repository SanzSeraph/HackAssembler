import Symbol from '../dist/symbol.js';
import assert from 'node:assert';
import { describe, it } from 'node:test';


describe('Symbol', function() {
    it('Populates value property', function() {
        let symbol = new Symbol('loop');

        assert.equal(symbol.value, 'loop', 'Values are not equal');
    });

    it('Has zero length if first character is not valid', function() {
        let symbol = new Symbol('1loop');

        assert.equal(symbol.length, 0);
    });
}) 