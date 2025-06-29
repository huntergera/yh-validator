import { describe, it, expect } from 'vitest';
import { isPhone } from "../src";

describe('isPhone', () => {
	it('validates correct international numbers with +', () => {
		expect(isPhone('+380961234567')).toBe(true);
		expect(isPhone('+14155552671')).toBe(true);
	});

	it('validates correct numbers without + with specified country', () => {
		expect(isPhone('0961234567', 'UA')).toBe(true);
		expect(isPhone('4155552671', 'US')).toBe(true);
	});

	it('returns false for invalid numbers', () => {
		expect(isPhone('12345')).toBe(false);
		expect(isPhone('abcdefghijk')).toBe(false);
		expect(isPhone('+123')).toBe(false);
	});

	it('returns false for empty string', () => {
		expect(isPhone('')).toBe(false);
	});

	it('validates numbers from different countries', () => {
		expect(isPhone('+41791234567')).toBe(true);
		expect(isPhone('+4915123456789')).toBe(true);
	});
});