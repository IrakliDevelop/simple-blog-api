const R = require('ramda');

const ValidationError = require('./validationerror');
const CustomError = require('./customerror');

const capitalize = R.replace(/^./, R.toUpper);

module.exports = {
    ValidationError,
    CustomError,
    capitalize,
};
