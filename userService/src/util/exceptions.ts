export class DbException extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class UserNotFoundException extends DbException {
    constructor(message: string) {
        super(message);
    }
}

export class UserAlreadyExistsException extends DbException {
    constructor(message: string) {
        super(message);
    }
}

export class UnauthorizedRequestException extends Error {
    constructor(message: string) {
        super(message);
    }
}