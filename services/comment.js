const { CustomError } = require('../utils');
const models = require('../models/sequelize');

module.exports.createComment = async function (comment) {
    const commentModel = models.getModel('Comment');

    if (!comment.userId || !comment.blogpostId) {
        throw new CustomError({
            message: 'comment should have an user and a blogpost',
            status: 406,
            code: 'NO_USER_AND_BLOGPOST_FOR_COMMENT_ERROR',
        });
    }
    if (!comment.content) {
        throw new CustomError({
            message: 'Comment can\'t be empty',
            status: 406,
            code: 'NO_EMPTY_COMMENT_BODY_ERROR',
        });
    }
    try {
        await commentModel.createComment(comment);

        return {
            status: 'OK',
            code: 200,
        };
    } catch (err) {
        console.error(err);
        throw new CustomError({
            message: 'Internal server error',
            status: 503,
            code: 'INTERNAL_SERVER_ERROR',
        });
    }
};

module.exports.updateComment = async function (comment) {
    const commentModel = models.getModel('Comment');

    if (!comment.userId || !comment.blogpostId) {
        throw new CustomError({
            message: 'comment should have an user and a blogpost',
            status: 406,
            code: 'NO_USER_AND_BLOGPOST_FOR_COMMENT_ERROR',
        });
    }
    if (!comment.content) {
        throw new CustomError({
            message: 'Comment can\'t be empty',
            status: 406,
            code: 'NO_EMPTY_COMMENT_BODY_ERROR',
        });
    }
    try {
        await commentModel.updateComment(comment);
        return {
            status: 'OK',
            code: 200,
            message: 'Comment updated successfully',
        };
    } catch (err) {
        console.error(err);
        throw new CustomError({
            message: 'Internal server error',
            status: 503,
            code: 'INTERNAL_SERVER_ERROR',
        });
    }
};
