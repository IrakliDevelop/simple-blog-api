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
        model.hasMany(models.Comment);
    };

    model.loadScopes = function (models) {
        this.addScope('withComments', {
            include: [{
                model: models.Comment,
                required: false,
            }],
        });
    };

    model.findById = function (id) {
        return this.scope('withComments').findByPk(id);
    };

    model.getList = function (page = 1, limit = 15) {
        return this.findAll({
            offset: (page - 1) * limit,
            limit: Number(limit),
        });
    };

    // TODO: test this
    model.updateOrCreateContent = async function (blogpost) {
        const [content, created] = await this.findOrCreate({
            where: { id: blogpost.id }, defaults: { ...blogpost },
        });

        if (!created) return content.update(blogpost.content);
        return content;
    };

    model.createBlogPost = function (blogpost) {
        return this.create(blogpost);
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
