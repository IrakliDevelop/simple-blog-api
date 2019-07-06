const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const config = require('../../config');
const { capitalize } = require('../../utils');

const sequelize = new Sequelize(config.sequelize);

const _models = {
    Sequelize,
    sequelize,
};

const init = () => {
    fs.readdirSync(__dirname).forEach(fname => {
        if (fname.match(/\.js$/) !== null && fname !== 'index.js') {
            const modelName = capitalize(fname.replace('.js', ''));
            _models[modelName] = sequelize.import(path.joi(__dirname, fname));
        }
    });

    // associations
    Object.keys(_models).forEach((model) => {
        return typeof _models[model].associate === 'function' && _models[model].associate(_models);
    });

    // scopes
    Object.keys(_models).forEach(model => {
        return typeof _models[model].loadScopes === 'function' && _models[model].loadScopes(_models);
    });

    sequelize.sync({ alter: true });
};

const getModel = name => {
    if (!_models[name]) throw new Error(`model '${name}' not found`);
    return _models[name];
};

module.exports = {
    init,
    getModel,
};
