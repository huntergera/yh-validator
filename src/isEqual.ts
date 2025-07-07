import ensureString from "./utils/ensureString";

export function isEqual(str: string, comparison: string) {
	const earlyExit = ensureString(str);
	if (earlyExit) return earlyExit;
	return str === comparison;
}