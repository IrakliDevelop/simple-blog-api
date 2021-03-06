class ValidationError extends Error {
    constructor(...args) {
        super(...args);

        this.name = this.constructor.name;
        Error.captureStackTrace(this, ValidationError);
    }
}

module.exports = ValidationError;
