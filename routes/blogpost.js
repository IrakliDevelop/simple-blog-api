const router = require('express').Router();
const { requireAuth } = require('../middlewares');

const { Blogpost } = require('../services');

router.post('/new', requireAuth, onNewBlogPostRequest);
router.post('/edit', requireAuth, onUpdateBlogPostRequest);

async function onNewBlogPostRequest(req, res, next) {
    const { user } = req;
    const blogPost = req.body;
    // TODO: implement userBlogPost middleware instead of hard-coded checking
    blogPost.userId = user.id;
    try {
        const result = await Blogpost.createBlogPost(blogPost);

        return res.json(result);
    } catch (err) {
        console.error(err);
        return next(err);
    }
}

async function onUpdateBlogPostRequest(req, res, next) {
    const { user } = req;
    const { blogPost } = req.body;
    if (blogPost.userId !== user.id) {
        return {
            code: 403,
            status: 'forbidden',
            message: 'forbidden',
        };
    }
    try {
        const result = await Blogpost.updateBlogPost(blogPost);

        return res.json(result);
    } catch (err) {
        console.error(err);
        return next(err);
    }
}

module.exports = router;
