export class InvalidTokenRequestError extends Error {
    status;

    constructor(status, message) {
        super(message);
        this.name = 'TokenError';
        this.status = status;
        this.message = `TokenError: ${message}`;
    }

    static UnauthorizedError() {
        return new InvalidTokenRequestError(401, 'User unauthorized');
    }

    static ForbiddenError() {
        return new InvalidTokenRequestError(403, 'Forbidden Error');
    }
}