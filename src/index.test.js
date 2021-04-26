const { isDesiName } = require('./index');

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
