import { describe, expect, it } from 'vitest';
import { isDate } from '../src/isDate';

describe('isDate', () => {
	it('should return true for valid DD/MM/YYYY', () => {
		expect(isDate('25/12/2020')).toBe(true);
	});

	it('should return true for valid MM-DD-YYYY', () => {
		expect(isDate('12-25-2020')).toBe(true);
	});

	it('should return true for valid YYYY.MM.DD', () => {
		expect(isDate('2020.12.25')).toBe(true);
	});

	it('should return true for valid YYYY.MM.DD', () => {
		expect(isDate('02.07.2025')).toBe(true);
	});

	it('should return false for invalid date (e.g. 31/02/2020)', () => {
		expect(isDate('31/02/2020')).toBe(false);
	});

	it('should return false for invalid separator usage', () => {
		expect(isDate('2020/12.25')).toBe(false);
	});

	it('should return false for non-string input', () => {
		expect(isDate(12345 as any)).toBe(false);
	});

	it('should return false for malformed date', () => {
		expect(isDate('2020/25/12')).toBe(false); // Wrong format
	});

	it('should return false for incomplete date', () => {
		expect(isDate('25/12')).toBe(false);
	});

	it('should return false for empty string', () => {
		expect(isDate('')).toBe(false);
	});

	it('should return false for date with invalid month', () => {
		expect(isDate('25/13/2020')).toBe(false);
	});

	it('should return false for date with invalid day', () => {
		expect(isDate('32/01/2020')).toBe(false);
	});
});