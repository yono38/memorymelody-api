'use strict';
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var restify = require('express-restify-mongoose');
var PORT = 7000;

var db = require('./db')();

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(morgan('dev'));

var router = express.Router();
restify.serve(router, db.models.Artist);
restify.serve(router, db.models.Venue);
restify.serve(router, db.models.Concert);
app.use(router);

app.listen(PORT, function() {
    console.log("Express server listening on port " + PORT);
});

