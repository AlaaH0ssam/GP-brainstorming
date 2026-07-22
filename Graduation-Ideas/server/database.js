const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./ideas.db", (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Database Connected");
  }
});

db.run(`
CREATE TABLE IF NOT EXISTS ideas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT,
  votes INTEGER DEFAULT 0
)
`);

module.exports = db;