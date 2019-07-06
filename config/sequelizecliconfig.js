module.exports = {
    development: {
        username: 'root',
        password: 'password',
        database: 'simpleblog',
        host: 'localhost',
        dialect: 'mysql',
    },
    production: {
        username: process.env.SEQUELIZE_DB_USERNAME,
        password: process.env.SEQUELIZE_DB_PASSWORD,
        database: process.env.SEQUELIZE_DB_NAME,
        host: process.env.SEQUELIZE_DB_HOSTNAME,
        dialect: 'mysql',
    },
};
