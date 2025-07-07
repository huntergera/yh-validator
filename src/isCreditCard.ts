import ensureString from "./utils/ensureString";

export function isCreditCard(cardNumber: unknown): boolean {
	const earlyExit = ensureString(cardNumber, "Card number");
	if (earlyExit) return false;

	// Теперь TypeScript знает, что cardNumber — точно строка
	const cleanedNumber = (cardNumber as string).replace(/[\s-]/g, '');

	if (cleanedNumber.length < 13 || cleanedNumber.length > 19) {
		return false;
	}

	// Luhn algorithm
	let sum = 0;
	let shouldDouble = false;

	for (let i = cleanedNumber.length - 1; i >= 0; i--) {
		let digit = parseInt(cleanedNumber[i], 10);

		if (shouldDouble) {
			digit *= 2;
			if (digit > 9) digit -= 9;
		}

		sum += digit;
		shouldDouble = !shouldDouble;
	}

	return sum % 10 === 0;
}
