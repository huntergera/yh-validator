export interface PasswordValidationOptions {
	minLength?: number;
	minUppercase?: number;
	minLowercase?: number;
	minNumbers?: number;
	minSpecialChars?: number;
}

export interface PasswordValidationResult {
	valid: boolean;
	errors: string[];
}

export function isStrongPassword(
	password: string,
	options: PasswordValidationOptions = {}
): PasswordValidationResult {
	const {
		minLength = 8,
		minUppercase = 1,
		minLowercase = 1,
		minNumbers = 1,
		minSpecialChars = 1,
	} = options;

	const errors: string[] = [];

	if (password.length < minLength) {
		errors.push(`Password must be at least ${minLength} characters long.`);
	}

	const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
	const lowercaseCount = (password.match(/[a-z]/g) || []).length;
	const numberCount = (password.match(/[0-9]/g) || []).length;
	const specialCharCount = (password.match(/[!@#$%^&*(),.?":{}|<>_\-\\[\]]/g) || []).length;

	if (uppercaseCount < minUppercase) {
		errors.push(`Password must contain at least ${minUppercase} uppercase letter(s).`);
	}

	if (lowercaseCount < minLowercase) {
		errors.push(`Password must contain at least ${minLowercase} lowercase letter(s).`);
	}

	if (numberCount < minNumbers) {
		errors.push(`Password must contain at least ${minNumbers} number(s).`);
	}

	if (specialCharCount < minSpecialChars) {
		errors.push(`Password must contain at least ${minSpecialChars} special character(s).`);
	}

	return {
		valid: errors.length === 0,
		errors,
	};
}