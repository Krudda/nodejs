export class InvalidTokenRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'TokenError';
        this.message = `TokenError: ${message}`;
    }
}