export class InvalidGroupRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'GroupError';
        this.message = `GroupError: ${message}`;
    }
}