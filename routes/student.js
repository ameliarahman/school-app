const express = require('express');
const router = express.Router();
const Model = require('../models')


function validasiEmail(req, res, errMessage) {
    res.render('addStudent', { alert: errMessage })
}

router.get('/', function (req, res) {
    Model.Student.findAll().then((result) => {
        res.render('student', { dataRowStudent: result })
    })

})
router.get('/add', function (req, res) {
    validasiEmail(req, res, '')
    // res.render('addStudent', {alert : ''})
})
router.post('/add', function (req, res) {
    Model.Student.create(req.body).then((result) => {
        res.redirect('../students')
    }).catch((reason) => {
        validasiEmail(req, res, reason.message)
    })

})
router.get('/edit/:id', function (req, res) {
    Model.Student.findById(req.params.id).then((result) => {
        res.render('editStudent', { dataRowStudent: result })
    })
})
router.post('/edit/:id', function (req, res) {
    Model.Student.update((req.body), {
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.redirect('../../students')
    })

})
router.get('/delete/:id', function (req, res) {
    Model.Student.destroy({
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.redirect('../../students')
    })
})

module.exports = router;