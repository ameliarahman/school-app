const express = require('express')
const app = express()
const session = require('express-session');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'))
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const subject = require('./routes/subject')
const teacher = require('./routes/teacher')
const student = require('./routes/student')
const index = require('./routes/index')
const user = require('./routes/user')
const login = require('./routes/login')

function authentication(req, res, next) {
    if (!req.session.login) {
        res.redirect('/login')
        return
    }
    next();
}
app.use('/login', login)
app.use(authentication);
app.use('/', index)
app.use('/subjects', subject)
app.use('/teachers', teacher)
app.use('/students', student)
app.use('/users', user)



app.listen(3000, function (err) {
    console.log('Tes')
});
