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

    // TODO: test this
    model.updateOrCreateContent = async function (blogpost) {
        const [content, created] = await this.findOrCreate({
            where: { id: blogpost.id }, defaults: { ...blogpost.content.toJSON() },
        });

        if (!created) return content.update(blogpost.content);
        return content;
    };

    // instance methods

    model.prototype.updateBlogpost = function (blogPost) {
        return this.update(blogPost.toJSON(), {
            where: {
                id: blogPost.id,
            },
        });
    };
    model.prototype.plain = function () {
        return this.get({ plain: true });
    };

    return model;
};
