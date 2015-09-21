var express = require('express');
var app = express();
var http = require('http');
var querystring = require('querystring')
var bodyParser = require('body-parser');

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

app.post('/push',function(request,response){
  // Define relevant info
  var privateKey = process.env.IONIC_PRIVATE_KEY;
  var tokens = [];
  // console.log($scope.token);

  // tokens.push(request.body.tokens);
  // console.log(request.body.tokens);

  var notification = request.body.noti;
  // var appId = process.env.IONIC_APP_ID;
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
  var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  });

  // Error handling.
  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  // Wite data to request body
  console.log("123123");
  req.write(JSON.stringify(notification));
  req.end();
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
