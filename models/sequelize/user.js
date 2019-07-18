const bcrypt = require('bcryptjs');


module.exports = function (sequelize, DataTypes) {
    const options = {
        indexes: [
            { unique: true, fields: ['username'], name: 'users_username_idx' },
            { fields: ['createdAt', 'updatedAt'], name: 'users_created_updated_at_idx' },
        ],
    };
    const model = sequelize.define('user', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER(11).UNSIGNED,
        },
        username: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
        },
        firstname: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            required: false,
            allowNull: true,
        },
    }, options);

    model.associate = (models) => {
        model.hasMany(models.Blogpost);
        model.hasMany(models.Comment);
    };

    // scopes

    model.loadScopes = function (models) {
        this.addScope('withPosts', {
            attributes: ['id', 'username', 'firstname', 'lastname'],
            include: [{
                model: models.Blogpost,
                required: false,
            }],
        });
    };

    // methods
    model.findByName = function (username) {
        return this.scope('withPosts').findOne({
            where: { username },
        });
    };

    model.findById = function (id) {
        return this.findByPk(id);
    };

    model.createUser = function ({
        username, password, firstname, lastname,
    }) {
        return this.create({
            username,
            password,
            firstname,
            lastname,
        });
    };

    model.generateHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    // instance methods

    model.prototype.validatePassword = function (password) {
        return bcrypt.compare(password || '', this.password);
    };

    model.prototype.plain = function () {
        return this.get({ plain: true });
    };

    return model;
};
