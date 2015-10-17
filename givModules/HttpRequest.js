"use strict";
var http = require('http');
var querystring = require('querystring')
var exports = module.exports = {};

exports.RequestIonicPush = function(options){
  var req = http.request(options, function(res) {
    // console.log('STATUS: ' + res.statusCode);
    // console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      // console.log('BODY: ' + chunk);
    });

    res.on('end', function (chunk) {
      // response.send("ok");
      return "ok";
    });
  });

  // Error handling.
  req.on('error', function(e) {
    // console.log('problem with request: ' + e.message);
    // response.send(e.message);
    return e;
  });

  // Wite data to request body
  req.write(JSON.stringify(notification));
  req.end();
};
