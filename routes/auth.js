const express = require('express');
const { omit } = require('ramda');
const { Auth } = require('../services');

const router = express.Router();


router.post('', onAuthRequest);
router.post('/register', onRegisterRequest);

async function onRegisterRequest(req, res, next) {
    const {
        username, password, firstname, lastname,
    } = req.body;
    try {
        const result = await Auth.register({
            username, password, firstname, lastname,
        });

        return res.json(result);
    } catch (err) {
        console.error(err);
        return next(err);
    }
}

async function onAuthRequest(req, res, next) {
    const { username, password } = req.body;
    try {
        const user = await Auth.auth({ username, password });
        const token = Auth.getAuthToken(omit(['password', 'blogposts'], user), {
            ipAddress: req.connection.remoteAddress,
        });
        return res.json({ token });
    } catch (err) {
        return next(err);
    }
}

module.exports = router;
