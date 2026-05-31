// TDD

import calculator from "./calculator";
import {expect} from "vitest";

describe('calculator function', () => {

    it('should exists', () => {
       calculator(2, 2);
   });

    it('two plus is four ', () => {
        const result: number = calculator(2, 2); // 4
        expect(result).toBe(4);
    });

    it('three plus five is eight ', () => {
        const result: number = calculator(3, 5); // 4
        expect(result).toBe(8);
    });
});