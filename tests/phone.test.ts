import { describe, it, expect } from 'vitest';
import { validatePhone } from "../src";

describe('validatePhone', () => {
	it('validates correct international numbers with +', () => {
		expect(validatePhone('+380961234567')).toBe(true);
		expect(validatePhone('+14155552671')).toBe(true);
	});

	it('validates correct numbers without + with specified country', () => {
		expect(validatePhone('0961234567', 'UA')).toBe(true);
		expect(validatePhone('4155552671', 'US')).toBe(true);
	});

	it('returns false for invalid numbers', () => {
		expect(validatePhone('12345')).toBe(false);
		expect(validatePhone('abcdefghijk')).toBe(false);
		expect(validatePhone('+123')).toBe(false);
	});

	it('returns false for empty string', () => {
		expect(validatePhone('')).toBe(false);
	});

	it('validates numbers from different countries', () => {
		expect(validatePhone('+41791234567')).toBe(true);
		expect(validatePhone('+4915123456789')).toBe(true);
	});
});