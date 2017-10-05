const express = require('express');
const router = express.Router();
const Model = require('../models')

router.get('/', function (req, res) {
  Model.Teacher.findAll().then((result)=>{
    res.render('teacher', {dataTeacher : result})
  })
})




module.exports = router;