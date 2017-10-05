const express = require('express');
const router = express.Router();
const Model = require('../models')

router.get('/', function (req, res) {
  Model.Subject.findAll().then((result)=>{
      res.render('subject', {dataRowSubject : result })
  })
})

module.exports = router;