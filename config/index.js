require('dotenv').config();

module.exports = {
    server: {
        port: process.env.SERVER_PORT || 3000,
        env: process.env.SERVER_ENV || 'development', // production, development
        enableCors: process.env.ENABLE_CORS,
    },
    sequelize: {
        host: process.env.SEQUELIZE_HOST,
        port: process.env.SEQUELIZE_PORT,
        dialect: 'mysql',
        database: process.env.SEQUELIZE_DB,
        operatorsAliases: false,
        username: process.env.SEQUELIZE_USERNAME,
        password: process.env.SEQUELIZE_PASSWORD,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'MySuperSecretGoesHere',
        options: {
            expiresIn: '1d',
        },
    },
};
