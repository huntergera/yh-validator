import { isEqual } from "../src";
import { describe, it, expect } from 'vitest';

describe('isEqual', () => {
	it('valid', () => {
		expect(isEqual('test', "test")).toBe(true);
		expect(isEqual('123', '123')).toBe(true);
	});

	it('invalid', () => {
		expect(isEqual('hello', 'world')).toBe(false);
	});
});