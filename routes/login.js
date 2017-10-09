const express = require('express');
const router = express.Router();
const Model = require('../models')
const session = require('express-session');
const crypto = require('crypto');

router.get('/', function (req, res) {
    res.render('login', { pageTitle: 'Login', message: '' })

})

router.post('/', function (req, res) {
    let password = req.body.password
    Model.User.findOne({
        where: {
            username: req.body.username
        }
    }).then((result) => {
        let salt = result.salt;
        let newPassword = crypto.createHmac('sha256', salt)
            .update(password)
            .digest('hex');
        if (result.password == newPassword) {
            req.session.login = true;
            req.session.role = result.role;
            res.redirect('/')
        } else {
            res.render('login', { message: 'Username / password is incorrect', pageTitle: 'Login' })
        }
    }).catch((reason) => {
        res.render('login', { message: 'Username / password is incorrect', pageTitle: 'Login' })
    })
})
router.get('/logout', function (req, res, next) {
    req.session.destroy()
    res.redirect('/');
});

module.exports = router;