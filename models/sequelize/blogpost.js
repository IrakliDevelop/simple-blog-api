module.exports = function (sequelize, DataTypes) {
    const options = {
        indexes: [
            { fields: ['createdAt', 'updatedAt'], name: 'blogposts_created_updated_at_idx' },
        ],
    };

    const model = sequelize.define('blogpost', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER(11).UNSIGNED,
        },
        title: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
        },
    }, options);

    model.associate = (models) => {
        model.belongsTo(models.User);
    };

    // instance methods
    model.prototype.plain = function () {
        return this.get({ plain: true });
    };

    return model;
};
