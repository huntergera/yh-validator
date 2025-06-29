import { describe, it, expect } from 'vitest';
import { isStrongPassword } from '../src';

describe('isStrongPassword', () => {

	// --- Tests for default options ---
	// Default options : minLength: 8, minUppercase: 1, minLowercase: 1, minNumbers: 1, minSpecialChars: 1

	it('should return valid: true for a strong password with default options', () => {
		const result = isStrongPassword('StrongP@ss1');
		expect(result.valid).toBe(true);
		expect(result.errors).toEqual([]);
	});

	it('should return valid: false and errors for a password that is too short (default minLength 8)', () => {
		const result = isStrongPassword('Short1!'); // 7 characters
		expect(result.valid).toBe(false);
		expect(result.errors).toContain('Password must be at least 8 characters long.');
	});

	it('should return valid: false and errors for a password missing uppercase letters', () => {
		const result = isStrongPassword('strongp@ss1');
		expect(result.valid).toBe(false);
		expect(result.errors).toContain('Password must contain at least 1 uppercase letter(s).');
	});

	it('should return valid: false and errors for a password missing lowercase letters', () => {
		const result = isStrongPassword('STRONGP@SS1');
		expect(result.valid).toBe(false);
		expect(result.errors).toContain('Password must contain at least 1 lowercase letter(s).');
	});

	it('should return valid: false and errors for a password missing numbers', () => {
		const result = isStrongPassword('StrongP@ss');
		expect(result.valid).toBe(false);
		expect(result.errors).toContain('Password must contain at least 1 number(s).');
	});

	it('should return valid: false and errors for a password missing special characters', () => {
		const result = isStrongPassword('StrongPass1');
		expect(result.valid).toBe(false);
		expect(result.errors).toContain('Password must contain at least 1 special character(s).');
	});

	it('should return multiple errors if password fails multiple criteria', () => {
		const result = isStrongPassword('weak'); // Too short, no uppercase, no number, no symbol
		expect(result.valid).toBe(false);
		expect(result.errors).toEqual([
			'Password must be at least 8 characters long.',
			'Password must contain at least 1 uppercase letter(s).',
			'Password must contain at least 1 number(s).',
			'Password must contain at least 1 special character(s).',
		]);
	});

	// --- Tests for custom options ---

	it('should return valid: true for a password meeting custom relaxed length', () => {
		const result = isStrongPassword('123456', {
			minLength: 6,
			minUppercase: 0,
			minLowercase: 0,
			minNumbers: 1,
			minSpecialChars: 0,
		});
		expect(result.valid).toBe(true);
		expect(result.errors).toEqual([]);
	});

	it('should return valid: false for a password not meeting custom length', () => {
		const result = isStrongPassword('12345', { minLength: 6 });
		expect(result.valid).toBe(false);
		expect(result.errors).toContain('Password must be at least 6 characters long.');
	});

	it('should return valid: true for a password with custom minUppercase', () => {
		const result = isStrongPassword('PASSWORD', {
			minUppercase: 8,
			minLowercase: 0,
			minNumbers: 0,
			minSpecialChars: 0,
			minLength: 8,
		});
		expect(result.valid).toBe(true);
		expect(result.errors).toEqual([]);
	});

	it('should return valid: false for a password not meeting custom minSpecialChars', () => {
		const result = isStrongPassword('Password123', { minSpecialChars: 2 });
		expect(result.valid).toBe(false);
		expect(result.errors).toContain('Password must contain at least 2 special character(s).');
	});

	it('should handle options where some min criteria are set to 0', () => {
		const result = isStrongPassword('simplepassword', {
			minLength: 5,
			minUppercase: 0,
			minLowercase: 0,
			minNumbers: 0,
			minSpecialChars: 0,
		});
		expect(result.valid).toBe(true);
		expect(result.errors).toEqual([]);
	});

	it('should return valid: false for a password with only spaces', () => {
		const result = isStrongPassword('        '); // 8 spaces
		expect(result.valid).toBe(false);
		// Should fail on uppercase, lowercase, numbers, symbols counts
		expect(result.errors).toEqual([
			'Password must contain at least 1 uppercase letter(s).',
			'Password must contain at least 1 lowercase letter(s).',
			'Password must contain at least 1 number(s).',
			'Password must contain at least 1 special character(s).',
		]);
	});
});