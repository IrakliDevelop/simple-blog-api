const services = require('../services');

const loggerService = new services.Logger();

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
    if (err.name === 'CustomError') {
        return res.status(err.status).json(err);
    }

    loggerService.error(err);
    return res.status(500).end('Internal server error');
};
