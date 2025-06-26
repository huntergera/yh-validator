import { validateEmail } from "../src";
import { describe, it, expect } from 'vitest';

describe('validateEmail', () => {
	it('valid emails', () => {
		expect(validateEmail('test@example.com')).toBe(true);
		expect(validateEmail('user.name+tag+sorting@example.com')).toBe(true);
		expect(validateEmail('user_name@example.co.uk')).toBe(true);
	});

	it('invalid emails', () => {
		expect(validateEmail('plainaddress')).toBe(false);
		expect(validateEmail('test@.com')).toBe(false);
		expect(validateEmail('test@com')).toBe(false);
		expect(validateEmail('@missinglocal.org')).toBe(false);
		expect(validateEmail('missingdomain@.')).toBe(false);
	});
});