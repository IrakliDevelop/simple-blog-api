const fs = require('fs');
const path = require('path');

const { capitalize } = require('../utils');

const _services = {

};

/* eslint-disable import/no-dynamic-require, global-require */
fs.readdirSync(__dirname).forEach(fname => {
    if (fname.match(/\.js$/) !== null && fname !== 'index.js') {
        const sname = capitalize(fname.replace('.js', ''));
        _services[sname] = require(path.join(__dirname, fname));
    }
});

module.exports = _services;
