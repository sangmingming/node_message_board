var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('message.db')

db.serialize(function() {
  db.run("CREATE TABLE message (name TEXT, content TEXT)");
  var stmt = db.prepare("INSERT INTO message VALUES (?, ?)");
  for (var i = 0; i < 10; i++) {
    stmt.run("msg" + i , "content" + i);
  }
  stmt.finalize();
});

db.close();
