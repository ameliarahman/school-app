const express = require('express');
const router = express.Router();
const Model = require('../models')

router.get('/', function (req, res) {
  Model.Teacher.findAll({ include: [Model.Subject] }).then((result) => {
    res.render('teacher', { dataTeacher: result })
  })
})
router.get('/add', function (req, res) {
  Model.Subject.findAll().then((result) => {
    res.render('addTeacher', { dataSubject: result })
  })

})
router.post('/add', function (req, res) {
  Model.Teacher.create(req.body).then((result) => {
    res.redirect('../teachers')
  })
})
router.get('/edit/:id', function (req, res) {
  Promise.all([
    Model.Teacher.findById(req.params.id),
    Model.Subject.findAll()
  ]).then((result) => {
    res.render('editTeacher', { dataTeacher: result[0], dataSubject: result[1] })
  })
})
router.post('/edit/:id', function (req, res) {
  Model.Teacher.update((req.body), {
    where: {
      id: req.params.id
    }
  }).then((result) => {
    res.redirect('../../teachers')
  })

})
router.get('/delete/:id', function (req, res) {
  Model.Teacher.destroy({
    where: {
      id: req.params.id
    }
  }).then((result) => {
    res.redirect('../../teachers')
  })
})
module.exports = router