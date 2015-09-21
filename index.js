var express = require('express');
var app = express();
var http = require('http');
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

  tokens.push(request.body.tokens);
  console.log(request.body.tokens);
  var appId = process.env.IONIC_APP_ID;

  // Encode your key
  var auth = new Buffer(privateKey + ':').toString('base64')
  // var auth = btoa(privateKey + ':');

  // Build the request object
  var req = {
    method: 'POST',
    host: 'push.ionic.io',
    path: '/api/v1/push',
    headers: {
      'Content-Type': 'application/json',
      'X-Ionic-Application-Id': appId,
      'Authorization': 'basic ' + auth
    },
    data: {
      "tokens": tokens,
      "notification": {
        "alert":"Hello World!"
      }
    }
  };
  // Make the API call
  callback = function(res) {
  var str = ''
  res.on('data', function (chunk) {
    str += chunk;
  });

  res.on('end', function () {
    response.send(str);
  });
}

  var pushRequest = http.request(req,callback);
  pushRequest.end();
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
