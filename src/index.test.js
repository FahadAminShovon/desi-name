const { isDesiName } = require('./index');
const { InvalidValueError } = require('./errors');

describe('name with number', () => {
	it('Should return false', () => {
		expect(isDesiName({ name: 'fahad991' })).toBe(false);
		expect(isDesiName({ name: '123123' })).toBe(false);
		expect(isDesiName({ name: 123123 })).toBe(false);
	});
});

describe('name with special characters', () => {
	it('should return false', () => {
		expect(isDesiName({ name: '32$%$@@' })).toBe(false);
	});
});

describe('name with consecutive spaces ', () => {
	it('Should return false', () => {
		expect(isDesiName({ name: 'fah   d' })).toBe(false);
	});
});

describe('name with special allowed special characters', () => {
	it('consecutive should return false', () => {
		expect(isDesiName({ name: 'fahad--admin' })).toBe(false);
	});
	it('single special characters should return true', () => {
		expect(isDesiName({ name: 'fahad-amin shovon' })).toBe(true);
	});
});

describe('allowed special characters', () => {
	it('should return true', () => {
		expect(isDesiName({ name: 'B.M. Fahad-ul_Amin' })).toBe(true);
	});
	it('should return false', () => {
		expect(isDesiName({ name: 'fahad--amin shovon' })).toBe(false);
	});
});

describe('validation with minLength and maxLength', () => {
	describe('when minLen or maxLen value is smaller than 0', () => {
		[
			{ name: 'John', minLen: -1, maxLen: 4 },
			{ name: 'Tahmid', minLen: 2, maxLen: -5 },
			{ name: 'Fahad Amin', minLen: -9, maxLen: -2 },
		].map(({ name, minLen, maxLen }) => {
			it(`minLen=${minLen}, maxLen=${maxLen} should throw InvalidValueError`, () => {
				expect(() => {
					isDesiName({ name, minLen, maxLen });
				}).toThrowError(
					new InvalidValueError('minLen or maxLen cannot be less than 0'),
				);
			});
		});
	});
});
