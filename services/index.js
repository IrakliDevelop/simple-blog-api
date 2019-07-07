const fs = require('fs');
const path = require('path');

const { capitalize } = require('../utils');

const services = {

};

/* eslint-disable import/no-dynamic-require, global-require */
fs.readdirSync(__dirname).forEach(fname => {
    if (fname.match(/\.js$/) !== null && fname !== 'index.js') {
        const sname = capitalize(fname.replace('.js', ''));
        services[sname] = require(path.join(__dirname, fname));
    }
});

module.exports = services;
