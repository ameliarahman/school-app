const express = require('express');
const router = express.Router();
const Model = require('../models')
const crypto = require('crypto');
const getSecret = require('../helper/secret')

router.use('/', function (req, res, next) {
    if (req.session.role != 'headmaster') {
        res.redirect('/login')
        return
    } else {
        next()
    }
})
router.get('/', function (req, res) {
    Model.User.findAll().then((result) => {
        res.render('user', { dataUser: result, pageTitle: 'Data User', session: req.session.role })
    })
})
router.get('/edit/:id', function (req, res) {
    Model.User.findById(req.params.id).then((result) => {
        res.render('editUser', { dataUser: result, pageTitle: 'Edit Data User' })
    })

})
router.post('/edit/:id', function (req, res) {


})

router.get('/add', function (req, res) {
    res.render('addUser')

})
router.post('/add', function (req, res) {
    let password = req.body.password
    let secret = getSecret(8);
    let newPassword = crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');

    Model.User.create(
        {
            username: req.body.username,
            password: newPassword,
            role: req.body.role,
            salt: secret

        })
        .then((result) => {
            res.redirect('../users')
        })

})

router.get('/delete/:id', function (req, res) {
    Model.User.destroy({
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.redirect('../../users')
    })
})


module.exports = router