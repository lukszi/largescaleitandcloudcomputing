export class UserNotFoundException extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class UnauthorizedRequestException extends Error {
    constructor(message: string) {
        super(message);
    }
}