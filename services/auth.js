const jwt = require('jsonwebtoken');
const { CustomError } = require('../utils');
const models = require('../models/sequelize');
const config = require('../config');

// TODO: test everything
/**
 * authenticates user based on provided username and password
 * @param username {string}
 * @param password {string}
 * @returns {Promise<never|*>}
 */
module.exports.auth = async function ({ username, password }) {
    const userModel = models.getModel('User');
    const foundUser = await userModel.findByName(username);

    if (!foundUser) {
        throw new CustomError({ status: 404, message: 'User not found', code: 'ERROR_USER_NOT_FOUND' });
    }
    if (!await foundUser.validatePassword(password)) {
        throw new CustomError({ status: 406, message: 'Invalid password', code: 'ERROR_INVALID_PASSWORD' });
    }
    const user = await userModel.findByNameWithPosts(username);
    return user.plain();
};

/**
 * generates and returns jwt token based on provided user and ipAddress
 * @param user {any}
 * @param ipAddress {string}
 * @returns {*}
 */
module.exports.getAuthToken = function (user, { ipAddress }) {
    return jwt.sign({ ...user, ipAddress }, config.jwt.secret, config.jwt.options);
};

/**
 * creates new user based on provided credentials
 * @param username {string}
 * @param password {string}
 * @param firstname {string}
 * @param lastname {string}
 * @returns {Promise<{code: number, message: string, status: string}>}
 */
module.exports.register = async function ({
    username, password, firstname, lastname,
}) {
    const userModel = models.getModel('User');

    if (await userModel.findByName(username)) {
        throw new CustomError({ status: 406, code: 'USERNAME_TAKEN_ERROR', message: 'Username already taken' });
    }
    const generatedPassword = await userModel.generateHash(password);
    try {
        await userModel.createUser({
            username, password: generatedPassword, firstname, lastname,
        });

        return {
            status: 200,
            message: 'User created successfully',
            code: 'Ok',
        };
    } catch (err) {
        // TODO: better handling
        console.error(err);
        throw err;
    }
};
