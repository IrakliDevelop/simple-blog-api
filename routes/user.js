const router = require('express').Router();
const { requireAuth } = require('../middlewares');

router.post('/info', requireAuth, onInfoRequest);

// TODO: implement this
// eslint-disable-next-line no-unused-vars
function onInfoRequest(req, res, next) {
    const { user } = req;
    return res.json(user);
}

module.exports = router;
