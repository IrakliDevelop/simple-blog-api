const { CustomError } = require('../utils');
const models = require('../models/sequelize');

module.exports.getBlogPostById = async function (id) {
    const blogPostModel = models.getModel('Blogpost');
    try {
        return blogPostModel.findById(id);
    } catch (err) {
        console.error(err);
        throw new CustomError({
            message: 'BlogPost not found',
            status: 404,
            error: 'ERROR_BLOGPOST_NOT_FOUND',
        });
    }
};
