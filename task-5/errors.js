export class InvalidUserRequestError extends Error {
    constructor(value) {
        super(`Invalid User Request: ${value}`);
    }
}

export class InvalidGroupRequestError extends Error {
    constructor(value) {
        super(`Invalid Group Request: ${value}`);
    }
}