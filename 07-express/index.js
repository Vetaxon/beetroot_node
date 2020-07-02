const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const router = require('./app/router');

const port = 3000;

const app = express();

app.set('view engine', 'ejs');

app.use(expressLayouts);

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use( function (req, res, next) {
    if (req.method === 'POST' && !Object.keys(req.body).length) {
        console.log('Empty body during POST request');
    }
    next();
});

app.use('/', router);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
