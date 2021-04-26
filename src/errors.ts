export class InvalidValueError extends Error {
	constructor(message: string) {
		super(message);
		Error.captureStackTrace(this, this.constructor);
	}
}
