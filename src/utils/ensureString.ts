export interface StringValidationResult {
	valid: boolean;
	errors: string[];
}

export default function ensureString(input: unknown, fieldName = 'Input'): StringValidationResult | null {
	if (typeof input !== 'string') {
		return {
			valid: false,
			errors: [`${fieldName} must be a string, but received ${typeof input}`],
		};
	}
	return null;
}