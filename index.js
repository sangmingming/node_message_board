var express = require('express')
var app = express()
var sqlite3 = require('sqlite3').verbose()
var bodyParser = require('body-parser')

app.use(bodyParser.json()) //for parsing application/json
app.use(bodyParser.urlencoded({extended: true})) //for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
      res.send('Hello World')
})

app.get('/messages', function(req, res) {
  var db = new sqlite3.Database("message.db")
  db.serialize(function() {
    db.all("SELECT * from message", function(err, rows) {
      res.jsonp(rows)
    })
  })  
  db.close()
})

app.post("/messages", function(req, res) {
  var db = new sqlite3.Database("message.db")
  db.serialize(function() {
    var stmt = db.prepare("INSERT INTO message VALUES(?, ?)")
    stmt.run(req.body.name, req.body.content)
    stmt.finalize()
  })
  db.close()
  console.log(req.body)
  res.jsonp({"result": 0, "content": req.body})
})

app.listen(3000)
