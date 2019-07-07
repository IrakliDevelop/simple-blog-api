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
            code: 'ERROR_BLOGPOST_NOT_FOUND',
        });
    }
};

module.exports.createBlogPost = async function (blogPost) {
    const blogPostModel = models.getModel('Blogpost');

    if (!blogPost.content) {
        throw new CustomError({
            message: 'BlogPost content mustn\'t be empty',
            status: 'ERROR_BLOGPOST_EMPTY_CONTENT',
            code: 406,
        });
    }
    try {
        await blogPostModel.createBlogPost(blogPost);
        return {
            status: 'OK',
            code: 200,
        };
    } catch (err) {
        console.error(err);
        return {
            code: 503,
            error: 'Internal server error',
        };
    }
};

module.exports.updateBlogPost = async function (blogPost) {
    const blogPostModel = models.getModel('Blogpost');

    if (!blogPost.content) {
        throw new CustomError({
            message: 'BlogPost content mustn\'t be empty',
            status: 'ERROR_BLOGPOST_EMPTY_CONTENT',
            code: 406,
        });
    }
    try {
        const foundBlogPost = await blogPostModel.findById(blogPost.id);
        await foundBlogPost.updateBlogPost(blogPost);
        return {
            status: 'OK',
            code: 200,
        };
    } catch (err) {
        console.error(err);
        return {
            code: 503,
            error: 'Internal server error',
        };
    }
};
