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
              + "SET n:" + request.body.label
              + " RETURN n";

  db.query(cypher,{nodes:request.body.nodes}, function(err, result) {
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
  var cypher = "START m = node({skillID})"
              +"MATCH (n)"
              + "WHERE n.lid='" + request.body.sID // + "' AND m.skill={{skillID}}"
              + "' CREATE UNIQUE (n)-[r:" + request.body.label + "]->(m)"
              + "RETURN r";

  db.query(cypher,{skillID:request.body.skills}, function(err, result) {
    if (err) {
      response.send(err);
      console.log("Neo4jCreateNewNode ---------- FAILED CREATE NEW RELATIONSHIP");
      // response.send();
     //  throw err;            BAD PRACTICE ERROR HANDLING
     return next(err);
    }

    console.log("Neo4jCreateNewNode ---------- SUCCESSFULLY CREATE NEW RELATIONSHIP");
    response.send("Neo4jCreateNewNode ---------- SUCCESSFULLY CREATE NEW RELATIONSHIP");
    console.log(result);
  });
};

//--------------------Neo4j Query---------------------------//
exports.QueryWithSkills = function(request,response,next){
  var cypher = "MATCH (n)<-[r:skill]-(x)"
             + "WHERE n.hashtag in {hashtag}"
             + "RETURN DISTINCT x";

 db.query(cypher,{hashtag:request.body.skillList.split(',')}, function(err, result) {
   if (err) {
    //  response.send();
    console.log("Neo4jCreateNewNode ---------- FAILED QUERY SKILLS");
     response.send(err);
    //  throw err;            BAD PRACTICE ERROR HANDLING
    return next(err);
   }

   console.log("Neo4jCreateNewNode ---------- SUCCESSFULLY QUERY SKILLS");
   response.send(result);
   console.log(result);
 });
};


//--------------------Neo4j Get all skill---------------------------//
exports.GetAllSkill = function(request,response,next){
  var cypher = "MATCH (n:SKILL)"
             + "RETURN n";

 db.query(cypher,{}, function(err, result) {
   if (err) {
    //  response.send();
     response.send(err);
     console.log("Neo4jCreateNewNode ---------- FAILED GET ALL SKILLS");
    //  throw err;            BAD PRACTICE ERROR HANDLING
    return next(err);
   }

   console.log("Neo4jCreateNewNode ---------- SUCCESSFULLY GET ALL SKILLS");
   response.send(result);
   console.log(result);
 });
};

//--------------------Neo4j Get all skill of 1 person---------------------------//
exports.GetSkillOnePerson = function(request,response,next){
  var cypher = "MATCH (n),(m)"
              + "WHERE n.lid='" + request.body.sID  "' AND n-[:SKILL]->m"
              + "RETURN m";

 db.query(cypher,{}, function(err, result) {
   if (err) {
    //  response.send();
     response.send(err);
     console.log("Neo4jCreateNewNode ---------- FAILED GET SKILLS FROM 1 PERSON");
    //  throw err;            BAD PRACTICE ERROR HANDLING
    return next(err);
   }

   console.log("Neo4jCreateNewNode ---------- SUCCESSFULLY GET SKILLS FROM 1 PERSON");
   response.send(result);
   console.log(result);
 });
};
