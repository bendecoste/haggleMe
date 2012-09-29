var haggle = exports; exports.constructor = function haggle(){};

var mysql = require('mysql');
var async = require('async');
var path = require('path');
var Hash = require('hashish');

var client = mysql.createClient({
  'host': 'localhost',
  'database': 'haggle'
});

var DBG = (process.env.DEBUG) ? console.log : false;

var HAGGLE_RUNNING = 1;

haggle.products = {};

haggle.post = function(req, res) {
  console.log('got a post');
  var pid = req.params.pid;
  var uid = req.params.uid;
  var price = req.params.price;
  var body = "";
  
  req.on('data', function(chunk) {
    body += chunk;
  });

  req.on('end', function() {
    DBG&&DBG("POST: (" + pid + ", " + uid + "," + price + ")");
    DBG&&DBG(" body: " + body);

    negotiateHaggle(pid, uid, price, function(err, neg) {
      res.send(neg);
    });
  });
};

haggle.get = function(req, res) {
  var pid = req.params.pid;
  var uid = req.params.uid;
  var body = "";
  
  req.on('data', function(chunk) {
    body += chunk;
  });

  req.on('end', function() {
    try {
      DBG&&DBG("GET: (" + pid + ", " + uid + ")");

      processGet(pid, uid, function(err, haggle) {
        var retBody ={
          'err' : err,
          'haggle' : haggle
        };
        return res.json({ 'response': retBody, 'err': err }, 200);
      });

    } catch(err) {
      return res.json({ 'err': err }, 500);
    }
  });
};

haggle.poll = function() {
  var sql = 'SELECT id, start_time, status ' +
            'FROM haggle ';

  client.query(sql, function(err, res) {
    if (err) {
      DBG&&DBG('ERROR READING FROM DB');
    }

    Hash.forEach(res, function(entry) {
      var running = entry.status === HAGGLE_RUNNING;
      var startTime = Date.now(entry.startTime);
      var currTime = Date.now();
      if (startTime <= currTime && running) {
        // haggle.run(entry);
      }
    });
  });
};

function processPost(pid, uid, body, cb) {
  cb(null, { 'data': "Something Interesting" } );
}

function processGet(pid, uid, cb) {
  cb(null, { 'data': "Something Interesting" } );
}

function negotiateHaggle(pid, uid, price, cb) {
  if (!haggle.products[pid + ':' + uid]) {
    newBuyer(pid, uid, function(err, res) {
      // quit here maybe
      if (err) {
        throw new Error ('error getting things');
      }

      haggle.products[pid + ':' + uid] = {
        'onTry': 0,
        'minPrice': res.item[0][0].min_price,
        'maxPrice': res.item[0][0].max_price,
        'haggles': res.user[0][0].haggles
      };

      return cb(null, next(pid, uid, price));

    });
  } else {
    return cb(null, next(pid, uid, price));
  }
}

function next(pid, uid, price) {
  var prod = haggle.products[pid + ':' + uid];

  // this is a new try
  ++prod.onTry;

  var max = parseInt(prod.maxPrice, 10);
  var min = parseInt(prod.minPrice, 10);
  var haggles = parseInt(prod.haggles, 10);
  var diff = max - price;
  var half = max + min / 2;

  if (prod.lastRes && price < prod.lastRes) {
    return "I want " + prod.lastRes;
  }
  if (parseInt(price, 10) >= prod.lastRes) {
    return accept();
  }

  if (price >= (max * 0.85)) {
    return accept();
  }

  if (prod.onTry >= 3 && price >= min) {
    return accept();
  }

  if (prod.onTry === 2 && price >= half) {
    return accept();
  }

  if (prod.onTry === 1 && price >= half + ((price + half) / 2)) {
    return accept();
  }

  else {
    /* console.log('hdjsahdjkasj', x1 + parseInt(price, 10)); */
    var add = (max - parseInt(price, 10)) * 0.5;
    var newPrice = parseInt(price, 10);

    var res = add + newPrice;
    prod.lastRes = res;

    return "I want " + (newPrice + add);
  }
}

function accept() {
  return "deal brooo";
}

function newBuyer(pid, uid, cb) {
  var itemQuery = 'SELECT min_price, max_price FROM item where id = ?';
  var userQuery = 'SELECT haggles FROM user where id = ?';

  var tasks = {
    item: client.query.bind(client, itemQuery, [pid]),
    user: client.query.bind(client, userQuery, [uid])
  };

  async.parallel(tasks, function(err, res) {
    cb(err, res);
  });
}


