import ensureString, { StringValidationResult } from "./utils/ensureString";

export function isDate(input: string): boolean {
	const earlyExitResult: StringValidationResult | null = ensureString(input);
	if (earlyExitResult) {
		return false;
	}

	const separators = ['/', '-', '.'];
	const usedSeparators = separators.filter(sep => input.includes(sep));

	if (usedSeparators.length !== 1) {
		return false;
	}

	const separator = usedSeparators[0];
	const parts = input.split(separator);

	if (parts.length !== 3) {
		return false;
	}

	let day: number, month: number, year: number;
	const [p1, p2, p3] = parts.map(Number);

	if (separator === '/') {
		// DD/MM/YYYY
		day = p1;
		month = p2;
		year = p3;
	} else if (separator === '-') {
		if (p1 > 31 && p2 >= 1 && p2 <= 12 && p3 >= 1 && p3 <= 31) {
			// YYYY-MM-DD (ISO 8601)
			year = p1;
			month = p2;
			day = p3;
		} else if (p1 >= 1 && p1 <= 12 && p2 >= 1 && p2 <= 31 && p3 >= 1000 && p3 <= 9999) {
			// MM-DD-YYYY
			month = p1;
			day = p2;
			year = p3;
		} else {
			return false;
		}
	} else if (separator === '.') {
		if (p1 > 999) {
			// YYYY.MM.DD
			year = p1;
			month = p2;
			day = p3;
		} else {
			// DD.MM.YYYY
			day = p1;
			month = p2;
			year = p3;
		}
	} else {
		return false;
	}

	if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) {
		return false;
	}

	if (year < 1000 || year > 9999 || month < 1 || month > 12 || day < 1) {
		return false;
	}

	const date = new Date(year, month - 1, day);

	return date.getFullYear() === year &&
		date.getMonth() === month - 1 &&
		date.getDate() === day &&
		!isNaN(date.getTime());
}