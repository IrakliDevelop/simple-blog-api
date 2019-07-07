const fs = require('fs');
const path = require('path');

const { capitalize } = require('../utils');

const routes = {

};


/* eslint-disable import/no-dynamic-require, global-require */
fs.readdirSync(__dirname).forEach(fname => {
    if (fname.match(/\.js$/) !== null && fname !== 'index.js') {
        const rname = capitalize(fname.replace('.js', ''));
        routes[rname] = require(path.join(__dirname, fname));
    }
});

module.exports = routes;
