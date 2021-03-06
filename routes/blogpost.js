const router = require('express').Router();
const { requireAuth } = require('../middlewares');

const { Blogpost } = require('../services');

router.post('/new', requireAuth, onNewBlogPostRequest);
router.post('/edit', requireAuth, onUpdateBlogPostRequest);
router.post('/list', onBlogPostListRequest);

async function onNewBlogPostRequest(req, res, next) {
    const { user } = req;
    const blogPost = req.body;
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
    // TODO: implement userBlogPost middleware instead of hard-coded checking
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

async function onBlogPostListRequest(req, res, next) {
    const { page, limit } = req.body;
    try {
        const blogPosts = await Blogpost.getBlogPostList({ page, limit });
        return res.json(blogPosts);
    } catch (err) {
        return next(err);
    }
}

module.exports = router;
