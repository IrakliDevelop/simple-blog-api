const jwt = require('jsonwebtoken');
const { CustomError } = require('../utils');
const models = require('../models');
const config = require('../config');

// TODO: test everything
module.exports.auth = async function ({ username, password }) {
    const userModel = models.getModel('User');
    const user = userModel.findByName(username);

    if (!user) {
        throw new CustomError({ status: 404, message: 'User not found', code: 'ERROR_USER_NOT_FOUND' });
    }
    if (!await user.validatePassword(password)) {
        throw new CustomError({ status: 403, message: 'Invalid password', code: 'ERROR_INVALID_PASSWORD' });
    }

    return user.plain();
};

module.exports.getAuthToken = function (user, { ipAddress }) {
    return jwt.sign({ ...user, ipAddress }, config.jwt.secret, config.jwt.options);
};
