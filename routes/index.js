const express = require('express');
const router = express.Router();
const Model = require('../models')

router.get('/', function (req, res) {
    res.render('index', { pageTitle: 'Data School Management', session : req.session })

})


module.exports = router;