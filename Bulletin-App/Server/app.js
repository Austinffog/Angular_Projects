require('./config/config');
require('./models/db');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const rtsIndex = require('./routes/index.router');

//ssl 
const https = require("https"),
fs = require("fs");

const options = {
key: fs.readFileSync("ssl/server.key"),
cert: fs.readFileSync("ssl/server.crt")
};

var app = express();
var bulletinController = require('./controllers/bulletin.controller')

const session = require('express-session');

//middleware
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));
app.use(passport.initialize());
app.use('/api', rtsIndex);
app.use('/bulletin', bulletinController);
app.use(session({secret:'cookiesecret', resave: false, saveUninitialized: false})); //setup session

//error handler
app.use((err, req, res, next) => {
    if (err.name == 'ValidationError'){
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

//log succesful logon file to txt
        var util = require('util');
        var successfulLogFile = fs.createWriteStream('successful-logons.txt', {flags: 'a'});
        var logStdout = process.stdout;

        console.log = function (d) {
          successfulLogFile.write(util.format(d) + '\n');
          logStdout.write(util.format(d) + '\n');
        };

        //log failed logon file to txt
        var failedLogFile = fs.createWriteStream('failed-logons.txt', {flags: 'a'});
        logStdout = process.stdout;

        console.log = function (f) {
          failedLogFile.write(util.format(f) + '\n');
          logStdout.write(util.format(f) + '\n');
        };

        //log access to bulletin board file to txt
        var accessLogFile = fs.createWriteStream('access-bulletinboards.txt', {flags: 'a'});
        logStdout = process.stdout;

        console.log = function (a) {
          accessLogFile.write(util.format(a) + '\n');
          logStdout.write(util.format(a) + '\n');
        };

        //log logouts file to txt
        var logoutsLogFile = fs.createWriteStream('logouts.txt', {flags: 'a'});
        logStdout = process.stdout;

        console.log = function (l) {
          logoutsLogFile.write(util.format(l) + '\n');
          logStdout.write(util.format(l) + '\n');
        };

        //log authorization failures file to txt
        var authfailureLogFile = fs.createWriteStream('auth-failure.txt', {flags: 'a'});
        logStdout = process.stdout;

        console.log = function (af) {
          authfailureLogFile.write(util.format(af) + '\n');
          logStdout.write(util.format(af) + '\n');
        };
        module.exports = console;

//start the server
//app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));

https.createServer(options, app).listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));