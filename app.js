const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const models = require('./models/sequelize');
const routes = require('./routes/index');
const config = require('./config');
const { errorHandler } = require('./middlewares');


models.init();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('env', config.server.env);
if (config.server.enableCors) {
    app.use(cors());
}

app.use(errorHandler);

app.get('', (req, res) => {
    res.send('test, test');
});

// setup routes
app.use('/api/auth', routes.Auth);
app.use('/api/user', routes.User);

app.listen('3000', () => {
    console.log('server is running at port 3000');
});
