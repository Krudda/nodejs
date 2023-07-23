export class InvalidUserRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserError';
        this.message = `UserError: ${message}`;
    }
}