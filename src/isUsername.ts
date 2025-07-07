import ensureString from "./utils/ensureString";

export interface UsernameValidationOptions {
	minLength?: number;        // Minimum total length of the username (default: 3)
	maxLength?: number;        // Maximum total length of the username (default: 30)
	allowSpaces?: boolean;     // Allow spaces within the username (default: false)
	allowDashes?: boolean;     // Allow hyphens '-' (default: true)
	allowUnderscores?: boolean; // Allow underscores '_' (default: true)
	allowPeriods?: boolean;    // Allow periods '.' (default: true)
	noLeadingTrailingSpecialChars?: boolean; // Disallow special chars at start/end (default: true)
	noConsecutiveSpecialChars?: boolean; // Disallow consecutive special chars (e.g., "user--name") (default: true)
	blacklist?: string[];      // Array of disallowed usernames (case-insensitive)
}

export interface UsernameValidationResult {
	valid: boolean;
	errors: string[];
}

export function isUsername(username: string, options: UsernameValidationOptions = {}): UsernameValidationResult {
	const {
		minLength = 3,
		maxLength = 30,
		allowSpaces = false,
		allowDashes = true,
		allowUnderscores = true,
		allowPeriods = true,
		noLeadingTrailingSpecialChars = true,
		noConsecutiveSpecialChars = true,
		blacklist = []
	} = options;

	const errors: string[] = [];

	const earlyExit = ensureString(username, 'Username');
	if (earlyExit) return earlyExit;

	const trimmedUsername = username.trim();

	if (trimmedUsername.length < minLength) {
		errors.push(`Must be at least ${minLength} characters long.`);
	}
	if (trimmedUsername.length > maxLength) {
		errors.push(`Cannot exceed ${maxLength} characters.`);
	}

	if (trimmedUsername.length === 0 && minLength > 0) {
		errors.push('Cannot be empty.');
	}

	// Check for spaces first
	if (!allowSpaces && username.includes(' ')) {
		errors.push('Cannot contain spaces.');
	}

	// Construct allowed characters
	let allowedChars = 'a-zA-Z0-9';
	if (allowDashes) allowedChars += '\\-';
	if (allowUnderscores) allowedChars += '_';
	if (allowPeriods) allowedChars += '\\.';
	if (allowSpaces) allowedChars += ' ';

	const disallowedCharRegex = new RegExp(`[^${allowedChars}]`);
	if (disallowedCharRegex.test(trimmedUsername)) {
		if (!errors.includes('Cannot contain spaces.')) {
			errors.push('Contains disallowed characters.');
		}
	}

	if (noLeadingTrailingSpecialChars) {
		const regex = /^[\s\-_.]|[\s\-_.]$/;
		if (regex.test(trimmedUsername)) {
			errors.push('Cannot start or end with a special character or space.');
		}
	}

	if (noConsecutiveSpecialChars) {
		const regex = /[\-_.]{2,}/;
		if (regex.test(trimmedUsername)) {
			errors.push('Cannot contain consecutive special characters.');
		}
	}

	const lowercasedUsername = trimmedUsername.toLowerCase();
	if (blacklist.some(item => lowercasedUsername === item.toLowerCase())) {
		errors.push('Is reserved or not allowed.');
	}

	const uniqueErrors = Array.from(new Set(errors));

	return {
		valid: uniqueErrors.length === 0,
		errors: uniqueErrors
	};
}