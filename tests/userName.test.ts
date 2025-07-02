import { describe, it, expect } from 'vitest';
import { isUsername } from '../src';

describe('isUsername', () => {
	// Test cases for valid usernames
	it('should return valid for basic alphanumeric usernames', () => {
		expect(isUsername('john_doe123').valid).toBe(true);
		expect(isUsername('User123').valid).toBe(true);
	});

	it('should return valid for usernames with allowed special characters', () => {
		expect(isUsername('john-doe').valid).toBe(true);
		expect(isUsername('john.doe').valid).toBe(true);
	});

	it('should return valid with custom options', () => {
		expect(isUsername('short', { minLength: 3 }).valid).toBe(true);
		expect(isUsername('user with spaces', { allowSpaces: true }).valid).toBe(true);
		expect(isUsername('user.name-123', { allowPeriods: true, allowDashes: true, allowUnderscores: false }).valid).toBe(true);
	});

	// Test cases for invalid usernames
	it('should return invalid for usernames that are too short', () => {
		const result = isUsername('ab', { minLength: 3 });
		expect(result.valid).toBe(false);
		expect(result.errors).toContain('Must be at least 3 characters long.');
	});

	it('should return invalid for usernames that are too long', () => {
		const result = isUsername('a'.repeat(31), { maxLength: 30 });
		expect(result.valid).toBe(false);
		expect(result.errors).toContain('Cannot exceed 30 characters.');
	});

	it('should return invalid for usernames with disallowed characters', () => {
		const result = isUsername('user!name');
		expect(result.valid).toBe(false);
		expect(result.errors).toContain('Contains disallowed characters.');
	});

	it('should return invalid for usernames with spaces by default', () => {
		const result = isUsername('user name');
		expect(result.valid).toBe(false);
		expect(result.errors).toContain('Cannot contain spaces.');
	});

	it('should return invalid for usernames starting with a special character', () => {
		const result = isUsername('_username');
		expect(result.valid).toBe(false);
		expect(result.errors).toContain('Cannot start or end with a special character or space.');
	});

	it('should return invalid for usernames ending with a special character', () => {
		const result = isUsername('username.');
		expect(result.valid).toBe(false);
		expect(result.errors).toContain('Cannot start or end with a special character or space.');
	});

	it('should return valid for username with allowed leading/trailing special characters if rule is off', () => {
		const result = isUsername('_username', { noLeadingTrailingSpecialChars: false });
		expect(result.valid).toBe(true); // Should be valid if this specific rule is turned off
		expect(result.errors).not.toContain('Cannot start or end with a special character or space.');
	});


	it('should return invalid for usernames with consecutive special characters', () => {
		const result = isUsername('user--name');
		expect(result.valid).toBe(false);
		expect(result.errors).toContain('Cannot contain consecutive special characters.');
	});

	it('should return invalid for blacklisted usernames (case-insensitive)', () => {
		const result1 = isUsername('Admin', { blacklist: ['admin', 'root', 'support'] });
		expect(result1.valid).toBe(false);
		expect(result1.errors).toContain('Is reserved or not allowed.');
	});

	it('should return valid if blacklist is empty', () => {
		const result = isUsername('admin', { blacklist: [] });
		expect(result.valid).toBe(true);
		expect(result.errors).toEqual([]);
	});

	it('should return invalid for empty string if minLength > 0', () => {
		const result = isUsername('', { minLength: 1 });
		expect(result.valid).toBe(false);
		expect(result.errors).toContain('Cannot be empty.');
	});

	it('should return invalid for non-string input', () => {
		// @ts-ignore intentionally pass wrong type
		const result = isUsername(123);
		expect(result.valid).toBe(false);
		expect(result.errors).toContain('Must be a string.');
	});

	it('should return invalid for usernames with spaces when allowSpaces is false (default)', () => {
		const result = isUsername('fgg ghfgh');
		expect(result.valid).toBe(false);
		expect(result.errors).toContain('Cannot contain spaces.');
	});
});