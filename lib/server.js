var express = require('express');
var path = require('path');

var start = require('./start');
var queue = require('./queue');

var user = require('./user');
var item = require('./item');

var app = express.createServer();
app.configure(function() {
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(app.router);
});

app.post('/item/:id([0-9]+)', item.post);
app.get('/item/:id([0-9]+)', item.get);

app.post('/user/:id([0-9]+)', user.post);
app.get('/user/:id([0-9]+)', user.get);

app.listen(config.api.listen);
console.log("API server running on port", 10000);

module.exports = app;
