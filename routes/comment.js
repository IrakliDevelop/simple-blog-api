const router = require('express').Router();
const { requireAuth } = require('../middlewares');

const { Comment } = require('../services');

router.post('/new', requireAuth, onCreateCommentRequest);
router.post('/edit', requireAuth, onUpdateCommentRequest);

async function onCreateCommentRequest(req, res, next) {
    const { user } = req;
    const { comment } = req.body;
    comment.userId = user.id;
    try {
        const result = await Comment.createComment(comment);
        return res.json(result);
    } catch (err) {
        console.error(err);
        return next(err);
    }
}

async function onUpdateCommentRequest(req, res, next) {
    const { user } = req;
    const { comment } = req.body;

    if (comment.userId !== user.id) {
        return {
            code: 403,
            status: 'forbidden',
            message: 'forbidden',
        };
    }
    try {
        const result = await Comment.updateComment(comment);
        return res.json(result);
    } catch (err) {
        console.error(err);
        return next(err);
    }
}

module.exports = router;
