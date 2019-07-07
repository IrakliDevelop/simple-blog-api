const jwt = require('jsonwebtoken');
const config = require('../config');

const getToken = authorization => {
    if (!authorization) return null;
    if ((authorization || '').startsWith('Bearer')) {
        return authorization.split(' ')[1];
    }
    return authorization;
};

const verifyToken = token => {
    return new Promise((resolve, reject) => {
        if (!token) return reject();

        return jwt.verify(token, config.jwt.secret, (err, decoded) => {
            if (err) return reject(err);
            return resolve(decoded);
        });
    });
};

const onUnauthorized = res => {
    res.status(401).end('Unauthorized');
};

module.exports = (req, res, next) => {
    const token = getToken(req.headers.authorization);
    if (!token) return onUnauthorized(res);

    return verifyToken(token).then(decoded => {
        req.user = decoded;
        return next();
    }).catch(() => {
        return onUnauthorized(res);
    });
};
