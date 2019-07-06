const R = require('ramda');

const capitalize = R.replace(/^./, R.toUpper);

module.exports = {
    capitalize,
};
