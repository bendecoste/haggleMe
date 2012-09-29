var express = require('express');
var path = require('path');

var haggle = require('./haggle');
var user = require('./user');
var item = require('./item');
var image = require('./image');

var queue = require('./queue.js');

const SERVER_PORT = 10000;

var app = express.createServer();
app.configure(function() {
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(app.router);

  app.set("views", __dirname + '/views');
  app.set('view engine', 'ejs');
  console.log('dirname', __dirname);
  app.use("/js", express.static(__dirname + '/js'));
  app.use("/css", express.static(__dirname + '/css'));

  app.register('.html', require('ejs'));
  app.set('view options', {
    layout: 'layout.html',
    pageTitle: ''
  });

  // start polling the database for new haggles
});

setInterval(function() {
  haggle.poll();
}, 5000);

app.post('/haggle/:pid([0-9]+)/:uid([0-9]+)/:price', haggle.post);
app.get('/haggle/:pid([0-9]+)/:uid([0-9]+)', haggle.get);

app.post('/item', item.post);
app.get('/item/:id([0-9]+)', item.get);

app.post('/user/:id([0-9]+)', user.post);
app.get('/user/:id([0-9]+)', user.get);

app.post('/image/:id([0-9]+)', image.post);
app.get('/image/:id([0-9]+)', image.get);

// queueId/productId/userId
app.post('/queue/:pid([0-9]+)/:uid([0-9]+)', queue.post);
app.get('/queue/:pid([0-9]+)', queue.get);

app.listen(SERVER_PORT);
console.log("HAGGLE server running on port", SERVER_PORT);


function renderTemplate(req, res, template, variables) {
  if (template.indexOf('.html')< 0) {
    template = template + ".html";
  }

  res.render(template, variables);
}

app.get('/', function(req, res) {
  renderTemplate(req, res, 'index', {
    pageTitle: 'Haggle'
  });
});

app.get('/haggle', function(req, res) {
  renderTemplate(req, res, 'haggle', {
    pageTitle: 'Haggle.ME'
  });
});
app.get('/register', function(req, res) {
  renderTemplate(req, res, 'register', {
    pageTitle: 'Haggle.ME'
  });
});

app.get('/create', function(req, res) {
  renderTemplate(req, res, 'create-item', {
    pageTitle: 'Create New Item'
  });
});

module.exports = app;
