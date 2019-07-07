module.exports = function (sequelize, DataTypes) {
    const options = {
        indexes: [
            { fields: ['createdAt', 'updatedAt'], name: 'blogposts_created_updated_at_idx' },
        ],
    };
    const model = sequelize.define('comment', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER(11).UNSIGNED,
        },
        content: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
        },
    }, options);

    model.associate = models => {
        model.belongsTo(models.User);
        model.belongsTo(models.Blogpost);
    };

    model.createComment = function (comment) {
        return this.create(comment);
    };

    model.updateComment = function (comment) {
        return this.update(comment, {
            where: {
                id: comment.id,
            },
        });
    };

    model.findById = function (id) {
        return this.findByPk(id);
    };

    // instance methods

    model.prototype.plain = function () {
        return this.get({ plain: true });
    };

    return model;
};
