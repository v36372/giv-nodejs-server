"use strict";

var exports = module.exports = {};
var HttpRequest = require('./HttpRequest.js');

exports.PushHandler = function(request,response){
  // Define relevant info
  var privateKey = process.env.IONIC_PRIVATE_KEY;
  var tokens = [];
  var appId = process.env.IONIC_APP_ID;

  // Encode your key
  var auth = new Buffer(privateKey + ':').toString('base64')
  // var auth = btoa(privateKey + ':');

  // Build the request object
  var options = {
    method: 'POST',
    hostname: 'push.ionic.io',
    port:80,
    path: '/api/v1/push',
    headers: {
      'Content-Type': 'application/json',
      'X-Ionic-Application-Id': appId,
      'Authorization': 'Basic ' + auth
    }
  };

  // Make the API call
  var PushRequestCb = function(result){
    if(result == "ok"){
      response.send("ok");
    }
    else {
      response.send(result.message);
    }
  };

  HttpRequest.RequestIonicPush(options,PushRequestCb);
};
