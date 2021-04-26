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
	describe('when minLength and maxLength is set to default', () => {
		describe('when input length is greater than 20', () => {
			it('should return false', () => {
				expect(isDesiName({ name: 'Muhammad bin Bakhtiyar Khalji' })).toBe(
					false,
				);
			});
		});

		describe('when input length is smaller than 3', () => {
			it('should return false', () => {
				expect(isDesiName({ name: 'ab' })).toBe(false);
			});
		});

		describe('when input length greater than 3 but smaller than 20', () => {
			it('should return true', () => {
				expect(isDesiName({ name: 'Fahad Amin' })).toBe(true);
			});
		});
	});

	describe('when input length in smaller than minLen', () => {
		it('should return false', () => {
			expect(isDesiName({ name: 'John', minLen: 6 })).toBe(false);
		});
	});

	describe('when input length in greater than maxLen', () => {
		it('should return false', () => {
			expect(
				isDesiName({ name: 'Muhammad bin Bakhtiyar Khalji', maxLen: 15 }),
			).toBe(false);
		});
	});

	describe('when input length in within defined range', () => {
		[
			{ name: 'John', minLen: 2, maxLen: 4 },
			{ name: 'Tahmid', minLen: 2, maxLen: 10 },
			{ name: 'Fahad Amin', minLen: 10, maxLen: 10 },
			{ name: '', minLen: 0, maxLen: 5 },
		].map(({ name, minLen, maxLen }) => {
			it(`name=${name}, minLen=${minLen}, maxLen=${maxLen} should return true`, () => {
				expect(isDesiName({ name, minLen, maxLen })).toBe(true);
			});
		});
	});

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
