type validateType = {
	name: string;
	maxLen?: number;
	minLen?: number;
};

/**
 * Returns true or false depending on validity of username
 * username should be of max 20 length, and min 3 lengths by default.
 * have to start with string and can contain ._-
 * username must not contain any number
 * not allowing consecutive special characters/spaces
 * @param validate.name The name you want to validate.
 * @param validate.maxLen Max length you want to allow
 * @param validate.minLen Min length you want to allow
 * @returns boolean
 */
function isDesiName({ name, maxLen = 20, minLen = 3 }: validateType): boolean {
	const regex = /^$|^([a-z])+(?!.*?[._-][._-])(?!.*?\s[._-\s])([._-\s]?[a-z]*)*$/i;
	if (typeof name === 'string') {
		const isValid = name.match(regex) || [];
		const matchedName = isValid[0];
		if (
			matchedName === name &&
			matchedName.length <= maxLen &&
			matchedName.length >= minLen
		) {
			return true;
		}
	}
	return false;
}

export { isDesiName };
