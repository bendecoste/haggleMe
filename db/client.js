var client = exports; exports.constructor = function client() {};
var mysql = require('mysql');

var connection = mysql.createClient({
  'host': 'localhost',
  'database': 'haggle'
});


client.query = function(query, cb) {
  connection.query(query, function(err, res) {
    cb(err, res);
  });
};

module.export = client;
