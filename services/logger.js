class Logger {
    constructor() {
        this.prefix = `[${new Date().toJSON()}]`;
    }

    info(...args) {
        return console.info.call(console, this.prefix, ...args);
    }

    warn(...args) {
        return console.warn.call(console, this.prefix, ...args);
    }

    log(...args) {
        return console.log.call(console, this.prefix, ...args);
    }

    error(...args) {
        return console.error.call(console, this.prefix, ...args);
    }

    trace(...args) {
        return console.trace.call(console, this.prefix, ...args);
    }
}

module.exports = Logger;
