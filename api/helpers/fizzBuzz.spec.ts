import {fizzBuzz} from "./fizzBuzz";
import {expect} from "vitest";

describe('fizzBuzz', () => {
    it('should exists', () => {
        fizzBuzz(2);
    });

    // it('returns 1 for 1', () => {
    //    const result = fizzBuzz(1);  // 1
    //     expect(result).toBe(1);
    // });
    //
    // it('returns 2 for 2', () => {
    //     const result = fizzBuzz(2);  // 1
    //     expect(result).toBe(2);
    // });
    //
    // it('function numbers must be form 1 to 30', () => {
    //     const result = fizzBuzz(31);
    //     expect(result).toBe('Number must be from 1 to 30');
    // });
    //
    // it('function numbers must be form 1 to 30', () => {
    //     const result = fizzBuzz(-1);
    //     expect(result).toBe('Number must be from 1 to 30');
    // });
    //
    // it('returns fizz for 3', () => {
    //     const result = fizzBuzz(3);
    //     expect(result).toBe('fizz');
    // });
    //
    // it('returns buzz for 5', () => {
    //     const result = fizzBuzz(5);
    //     expect(result).toBe('buzz');
    // });
    //
    // it('returns FizzBuzz for 15', () => {
    //     const result = fizzBuzz(15);
    //     expect(result).toBe('FizzBuzz');
    // });
    //
    // it('returns FizzBuzz for 30', () => {
    //     const result = fizzBuzz(30);
    //     expect(result).toBe('FizzBuzz');
    // });

    it.each([
        [1, 1],
        [2, 2],
        [-1, 'Number must be from 1 to 30'],
        [31, 'Number must be from 1 to 30'],
        [3, 'fizz'],
        [5, 'buzz'],
        [15, 'FizzBuzz'],
        [30, 'FizzBuzz'],
    ])(`returns %s for %s`, (input: number, expected: number | string) => {
        const result = fizzBuzz(input);
        expect(result).toBe(expected);
    });

});