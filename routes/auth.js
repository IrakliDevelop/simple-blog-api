const express = require('express');
const { Auth } = require('../services/index');

const router = express.Router();


router.get('register', onRegisterRequest);

async function onRegisterRequest(req, res, next) {
    const { username, password } = req.body;
    try {
        const result = await Auth.register({ username, password });

        return res.json(result);
    } catch (err) {
        console.error(err);
        return next(err);
    }
}

module.exports = router;
