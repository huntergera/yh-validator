export default function ensureString(input: string) {
	if (input === undefined || input === null) throw new TypeError(`Expected a string but received a ${input}`);
	if (input.constructor.name !== 'String') throw new TypeError(`Expected a string but received a ${input.constructor.name}`);
}