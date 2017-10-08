const express = require('express');
const router = express.Router();
const Model = require('../models')


router.get('/', function (req, res) {
  Model.Subject.findAll({ include: [Model.Teacher] }).then((result) => {
    res.render('subject', { dataSubject: result, pageTitle: 'Data Subject' })
  })
})
router.get('/add', function (req, res) {
  res.render('addSubject', { pageTitle: 'Add Data Subject' })
})
router.post('/add', function (req, res) {
  Model.Subject.create(req.body).then((result) => {
    res.redirect('../subjects')
  })

})
router.get('/edit/:id', function (req, res) {
  Model.Subject.findById(req.params.id).then((result) => {
    res.render('editSubject', { dataSubject: result, pageTitle: 'Edit Data Subject' })
  })
})

router.post('/edit/:id', function (req, res) {
  Model.Subject.update((req.body), {
    where: {
      id: req.params.id
    }
  }).then((result) => {
    res.redirect('../../subjects')
  })

})
router.get('/:id/enrolledstudents', function (req, res) {
  Model.StudentSubject.findAll({
    include: [Model.Student, Model.Subject], where:
    {
      SubjectId: req.params.id
    }
  }).then((result) => {
    res.render('enrolledStudent', { dataStudentSubject: result, pageTitle: 'Enrolled Student' })
  })
})

router.get('/:SubjectId/:id/givescore', function (req, res) {
  Model.StudentSubject.findById(req.params.id, {
    include: [Model.Student, Model.Subject]
  }).then((result) => {
    res.render('score', { dataStudentSubject: result, pageTitle: 'Student Score' })
  })
})
router.post('/:SubjectId/:id/givescore', function (req, res) {
  Model.StudentSubject.update((req.body), {
    where: {
      id: req.params.id
    }
  }).then((result) => {
    res.redirect('../enrolledstudents')
  })
})


router.get('/delete/:id', function (req, res) {
  Model.Subject.destroy({
    where: {
      id: req.params.id
    }
  }).then((result) => {
    res.redirect('../../subjects')
  })
})

module.exports = router;