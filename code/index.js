var express = require('express');
var freq = require('freq');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var havenondemand = require('havenondemand');
var async = require("async");
bodyParser = require('body-parser')
urlencoded = bodyParser.urlencoded({extended: false})
var HODApiKey = process.env.HODAPIKEY

client = new havenondemand.HODClient(HODApiKey)
port = process.env.PORT || 5000;

var buttonCounter = 0
var frequencyList = [];
var tags = [];

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.locals.phone = process.env.PHONE;
app.get("/", function(req, res) {
  res.render('index', {
   phone: process.env.PHONE
  });
});


app.post("/text_processor", urlencoded,  function(req,res) {
  var text = req.body["Body"]
  var sentBy = req.body["From"]
  //console.log(sentBy)
  var location = req.body["FromCountry"]
  //io.emit('message', {message: text, from: "021326481", "sentiment": ""})
  var data1 = {text: text}
  var data2 = {text: text, entity_type: ["people_eng", "places_eng", "companies_eng"]}
  client.post('analyzesentiment', data1, false, function(err1, resp1, body1){
      console.log(resp1.body)
      var sentiment = resp1.body.aggregate.sentiment
      var sentScore = resp1.body.aggregate.score
      io.emit('message', {message: text, from: sentBy, "sentiment": sentiment})
      //console.log("Sentiment Score: " + sentScore);
      io.emit('score', {score: sentScore, sentiment: sentiment })
      client.post('extractconcepts', data1, false, function(err2, resp2, body2){
        var conceptlist = resp2.body.concepts
        //console.log("Concepts: " + conceptlist)
        io.emit('concepts', {concepts: conceptlist})
        client.post('extractentities', data2, false, function(err3,resp3,body3){
          var entityList = resp3.body.entities
          //console.log(entityList)
          io.emit('entities', {ent: entityList})
        })
      })

    })
}); 
 
 http.listen(port, function(){
  console.log("Listening on port: "+port);
});

