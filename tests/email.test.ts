import { isEmail } from "../src";
import { describe, it, expect } from 'vitest';

describe('isEmail', () => {
	it('valid emails', () => {
		expect(isEmail('test@example.com')).toBe(true);
		expect(isEmail('user.name+tag+sorting@example.com')).toBe(true);
		expect(isEmail('user_name@example.co.uk')).toBe(true);
	});

	it('invalid emails', () => {
		expect(isEmail('plainaddress')).toBe(false);
		expect(isEmail('test@.com')).toBe(false);
		expect(isEmail('test@com')).toBe(false);
		expect(isEmail('@missinglocal.org')).toBe(false);
		expect(isEmail('missingdomain@.')).toBe(false);
	});
});