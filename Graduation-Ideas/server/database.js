const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = path.join(__dirname, "data", "ideas.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database Connection Error: ", err.message);
  } else {
    console.log("Database Connected successfully inside Volume");
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