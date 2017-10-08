const express = require('express');
const router = express.Router();
const Model = require('../models')


function validasiEmail(req, res, errMessage) {
    res.render('addStudent', { alert: errMessage })
}

router.get('/', function (req, res) {
    Model.Student.findAll({
        order: [
            ['first_name', 'ASC'],
        ]
    }).then((result) => {
        res.render('student', { dataRowStudent: result, pageTitle: "Student" })
    })

})

router.get('/:id/addsubject', function (req, res) {
    Promise.all([
        Model.Student.findById(req.params.id),
        Model.Subject.findAll()
    ]).then((result) => {
        res.render('addStudentSubject', { dataStudent: result[0], dataSubject: result[1], pageTitle: "Add Data Subject" })
    })
})
router.post('/:id/addsubject', function (req, res) {
    Model.StudentSubject.create({
        StudentId: req.params.id,
        SubjectId: req.body.SubjectId
    }).then((result) => {
        res.redirect('../../students')
    })
})

router.get('/add', function (req, res) {
    // validasiEmail(req, res, '')
    res.render('addStudent', { pageTitle: "Add Data Student" })
})
router.post('/add', function (req, res) {
    Model.Student.create(req.body).then((result) => {
        res.redirect('../students')
    })
})
router.get('/edit/:id', function (req, res) {
    Model.Student.findById(req.params.id).then((result) => {
        res.render('editStudent', { dataRowStudent: result, pageTitle: "Edit Data Student" })
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