const router = require('express').Router();
const { requireAuth } = require('../middlewares');
const { User } = require('../services');

router.get('/info', requireAuth, onInfoRequest);

// TODO: implement this
async function onInfoRequest(req, res, next) {
    const { user } = req;
    try {
        const userInfo = await User.getUserInfo(user.username);
        return res.json(userInfo);
    } catch (err) {
        console.error(err);
        return next(err);
    }
}

module.exports = router;
