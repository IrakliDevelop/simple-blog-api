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
    };

    // instance methods

    model.prototype.plain = function () {
        return this.get({ plain: true });
    };

    return model;
};
