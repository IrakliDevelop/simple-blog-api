const { CustomError } = require('../utils');
const models = require('../models/sequelize');

/**
 * returns user info based on provided username
 * @param {string} username
 * @returns {Promise<*>}
 */
module.exports.getUserInfo = async function (username) {
    const userModel = models.getModel('User');

    try {
        return await userModel.findByNameWithPosts(username);
    } catch (err) {
        console.error(err);
        throw err;
    }
};
