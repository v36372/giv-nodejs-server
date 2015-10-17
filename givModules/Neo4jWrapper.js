// https://github.com/brikteknologier/seraph
url = require('url').parse(process.env.GRAPHENEDB_URL);

var db = require("seraph")({
  server: url.protocol + '//' + url.host,
  user: url.auth.split(':')[0],
  pass: url.auth.split(':')[1]
});

var exports = module.exports = {};

//--------------------Neo4j Create new NODE---------------------------//
exports.CreateNewNode = function(request,response,next){
  db.save(request.body.node,request.body.label, function(err, node) {
    if (err){
      console.log("Neo4jCreateNewNode ---------- FAILED CREATE NEW NODE");
      response.send(err);
      // throw err;    BAD PRACTICE ERROR HANDLING
      return next(err);
    }
    console.log("Neo4jCreateNewNode ---------- SUCCESSFULLY CREATE NEW NODE");
    response.send("ok");
  });
};

//--------------------Neo4j Create new RELATIONSHIP---------------------------//
exports.CreateNewRela = function(request,response,next){
  db.relate(request.body.sID, request.body.label, request.body.eID, request.body.ext, function(err, relationship) {
    if(err) {
      console.log("Neo4jCreateNewRela ---------- FAILED CREATE NEW RELATIONSHIP");
      response.send(err);
      // throw err;   BAD PRACTICE ERROR HANDLING
      return next(err);
    }
    console.log("Neo4jCreateNewRela ---------- SUCCESSFULLY CREATE NEW RELATIONSHIP");
    response.send('ok');
  });
};

//--------------------Neo4j Query---------------------------//
exports.QueryWithSkills = function(request,response,next){
  var cypher = "MATCH (n)<-[r:skill]-(x)"
             + "WHERE n.hashtag in {hashtag}"
             + "RETURN DISTINCT x";

 db.query(cypher,{hashtag:request.body.skillList.split(',')}, function(err, result) {
   if (err) {
     console.log("Neo4jQuery ---------- QUERY WITH SKILL LIST FAIL");
     response.send(err);
    //  throw err;            BAD PRACTICE ERROR HANDLING
    return next(err);
   }

   response.send(result);
   console.log(result);
 });
};
