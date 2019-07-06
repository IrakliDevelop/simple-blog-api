class CustomError extends Error {
    constructor({ message, status, code }) {
        super(message);

        this.details = message;
        this.status = status;
        this.code = code;
        this.name = this.constructor.name;

        Error.captureStackTrace(this, CustomError);
    }
}

module.exports = CustomError;
