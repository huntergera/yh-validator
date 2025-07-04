import phone from 'phone';

export function isPhone(phoneNumber: string, countryCode?: string): boolean {
	const options = countryCode ? { country: countryCode } : undefined;
	const result = phone(phoneNumber, options);
	return result.isValid;
}