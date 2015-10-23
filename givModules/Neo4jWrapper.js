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
  var cypher = "CREATE (n{nodes})"
              + "SET n:{label}"
              + "RETURN n";

  db.query(cypher,{nodes:request.body.nodes,label:request.body.label}, function(err, result) {
    if (err) {
      response.send(err);
      console.log("Neo4jCreateNewNode ---------- FAILED CREATE NEW NODE");
     //  response.send(err);
     //  throw err;            BAD PRACTICE ERROR HANDLING
     return next(err);
    }

    console.log("Neo4jCreateNewNode ---------- SUCCESSFULLY CREATE NEW NODE");
    response.send("Neo4jCreateNewNode ---------- SUCCESSFULLY CREATE NEW NODE");
    console.log(result);
  });
};

//--------------------Neo4j Create new RELATIONSHIP---------------------------//
exports.CreateNewRela = function(request,response,next){
  var cypher = "UNWIND {skills} AS map"
             + "' CREATE UNIQUE (n)-[r:" + request.body.label + "]->(map)"
             + "WHERE n.lid ='"+request.body.nodes[node].sID;
             + "' RETURN r";

  // for(var node in request.body.nodes){
  //   var cypher = "MATCH (n),(m)"
  //              + "WHERE n.lid='" + request.body.nodes[node].sID + "' AND m.skill='" + request.body.nodes[node].eID
  //              + "' CREATE UNIQUE (n)-[r:" + request.body.label + "]->(m)"
  //              + "WHERE r.level='Intermediate'"
  //              + "RETURN n";
  //
  //   db.query(cypher, function(err, result) {
  //     if (err) {
  //       console.log("Neo4jCreateNewRela ---------- FAILED CREATE NEW RELATIONSHIP");
  //       response.send("Neo4jCreateNewRela ---------- FAILED CREATE NEW RELATIONSHIP");
  //      //  response.send(err);
  //      //  throw err;            BAD PRACTICE ERROR HANDLING
  //      return next(err);
  //     }
  //     console.log("Neo4jCreateNewRela ---------- SUCCESSFULLY CREATE NEW RELATIONSHIP");
  //     response.send("Neo4jCreateNewRela ---------- SUCCESSFULLY CREATE NEW RELATIONSHIP");
  //   });
  // }

  db.query(cypher,{nodes:request.body.nodes}, function(err, result) {
    if (err) {
      // response.send();
      response.send(err);
     //  throw err;            BAD PRACTICE ERROR HANDLING
     return next(err);
    }

    response.send(result);
   //  console.log(result);
  });
};

//--------------------Neo4j Query---------------------------//
exports.QueryWithSkills = function(request,response,next){
  var cypher = "MATCH (n)<-[r:skill]-(x)"
             + "WHERE n.hashtag in {hashtag}"
             + "RETURN DISTINCT x";

 db.query(cypher,{hashtag:request.body.skillList.split(',')}, function(err, result) {
   if (err) {
     response.send();
    //  response.send(err);
    //  throw err;            BAD PRACTICE ERROR HANDLING
    return next(err);
   }

   response.send(result);
  //  console.log(result);
 });
};
