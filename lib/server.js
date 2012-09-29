var express = require('express');
var path = require('path');

var haggle = require('./haggle');
var user = require('./user');
var item = require('./item');

const SERVER_PORT = 10000;

var app = express.createServer();
app.configure(function() {
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(app.router);
});

app.post('/haggle/:pid([0-9]+)/:uid([0-9]+)/:price', haggle.post);
app.get('/haggle/:pid([0-9]+)/:uid([0-9]+)', haggle.get);

app.post('/item/:id([0-9]+)', item.post);
app.get('/item/:id([0-9]+)', item.get);

app.post('/user/:id([0-9]+)', user.post);
app.get('/user/:id([0-9]+)', user.get);

app.listen(SERVER_PORT);
console.log("API server running on port", SERVER_PORT);

module.exports = app;
