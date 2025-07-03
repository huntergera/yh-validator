import ensureString from "./utils/ensureString";

export function isEqual(str: string, comparison: string) {
	ensureString(str);
	return str === comparison;
}