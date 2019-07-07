const router = require('express').Router();
const { requireAuth } = require('../middlewares');

const { Blogpost } = require('../services');

router.post('/new', requireAuth, onNewBlogPostRequest);

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

module.exports = router;
