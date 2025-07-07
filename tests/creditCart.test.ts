import { isCreditCard } from "../src";
import { describe, it, expect } from 'vitest';

describe('isCreditCard', () => {
	it('valid credit card', () => {
		expect(isCreditCard('4111 1111 1111 1111')).toBe(true); // Visa
		expect(isCreditCard('5500-0000-0000-0004')).toBe(true); // MasterCard
		expect(isCreditCard('340000000000009')).toBe(true);     // American Express
	});

	it('invalid credit card', () => {
		expect(isCreditCard('1234 5678 9012 3456')).toBe(false);
		expect(isCreditCard('4111 1111 1111 1112')).toBe(false);
		expect(isCreditCard('not a card')).toBe(false);
	});
});