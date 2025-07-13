import ensureString from "./utils/ensureString";

export function isUrl(input: string): boolean {
	const earlyExit = ensureString(input);
	if (earlyExit) return false;

	try {
		new URL(input);
		return true;
	} catch {
		return false;
	}
}