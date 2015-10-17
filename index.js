"use strict";

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PushNotiWrapper = require('./givModules/PushNotiWrapper.js');
var Neo4jWrapper = require('./givModules/Neo4jWrapper.js');

app.use(bodyParser());

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.get('/', function(request, response) {
  response.send("ok");
});

app.post('/push',PushNotiWrapper.PushHandler);

app.post('/createnode',Neo4jWrapper.CreateNewNode);
app.post('/createrela',Neo4jWrapper.CreateNewRela);
app.post('/query',Neo4jWrapper.QueryWithSkills);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
