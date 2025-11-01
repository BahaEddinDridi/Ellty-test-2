import { compute } from '../src/utils/compute';
import { describe, expect, test } from "@jest/globals";

describe('compute utility function', () => {
  test('adds two numbers', () => {
    expect(compute(2, '+', 3)).toBe(5);
  });

  test('subtracts two numbers', () => {
    expect(compute(5, '-', 2)).toBe(3);
  });

  test('multiplies two numbers', () => {
    expect(compute(4, '*', 3)).toBe(12);
  });

  test('divides two numbers', () => {
    expect(compute(10, '/', 2)).toBe(5);
  });

  test('throws on division by zero', () => {
    expect(() => compute(10, '/', 0)).toThrow('Division by zero');
  });

  test('throws on invalid operation', () => {
    expect(() => compute(10, '%', 2)).toThrow('Invalid operation');
  });
});
