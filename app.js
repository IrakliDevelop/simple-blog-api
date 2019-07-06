const express = require('express');
const cors = require('cors');

const models = require('./models/sequelize');
const config = require('./config');


models.init();

const app = express();

app.set('env', config.server.env);
if (config.server.enableCors) {
    app.use(cors());
}

app.get('', (req, res) => {
    res.send('test, test');
});

app.listen('3000', () => {
    console.log('server is running at port 3000');
});
