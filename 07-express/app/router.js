const express = require('express');


/**
 * @var {Object} router
 */
const router = express.Router();


router.get('/', function (req, res) {
    res.render('pages/home');
});

router.get('/login', function (req, res) {
    res.render('pages/login')
});

router.post('/login', function (req, res) {

    const body = req.body;

    let data = {};

    if (typeof body.login === 'undefined' || typeof body.password === 'undefined') {
        data.error = 'Login failed. Messed params.';
        res.render('pages/login', data);
    }
    if (body.login === 'bill' && body.password === '12345') {
        data.name = 'Bill';
    } else {
        data.error = 'Login failed';
    }

    res.render('pages/login', data)
});

module.exports = router;