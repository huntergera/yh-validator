import { describe, it, expect } from 'vitest';
import { isUrl } from '../src';

describe('isUrl', () => {
	it('should return true for valid URLs', () => {
		expect(isUrl('https://example.com')).toBe(true);
		expect(isUrl('http://localhost:3000')).toBe(true);
		expect(isUrl('ftp://ftp.example.com')).toBe(true);
	});

	it('should return false for invalid URLs', () => {
		expect(isUrl('not-a-url')).toBe(false);
		expect(isUrl('')).toBe(false);
		expect(isUrl(123)).toBe(false);
		expect(isUrl(null)).toBe(false);
	});
});