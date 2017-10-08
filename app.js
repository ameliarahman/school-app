const express = require('express')
const app = express()

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const subject = require('./routes/subject')
const teacher = require('./routes/teacher')
const student = require('./routes/student')
const index = require('./routes/index')

app.use('/', index)
app.use('/subjects', subject)
app.use('/teachers', teacher)
app.use('/students', student)



app.listen(3000, function (err) {
    console.log('Tes')
});
