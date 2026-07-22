const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./database");

const app = express();
app.use(cors({
  origin: 'https://gp-brainstorming-vkhc.vercel.app',
  credentials: true
}));
app.use(express.json());

app.get("/ideas", (req, res) => {
  db.all("SELECT * FROM ideas", [], (err, rows) => {
    if (err) return res.status(500).json(err);

    res.json(rows);
  });
});

app.post("/ideas", (req, res) => {
  const { title, description, status } = req.body;

  db.run(
    `INSERT INTO ideas(title, description, status)
     VALUES(?,?,?)`,
    [title, description, status],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({
        id: this.lastID,
        title,
        description,
        status,
        votes: 0,
        notes: "",
      });
    }
  );
});

app.delete("/ideas/:id", (req, res) => {
  db.run(
    "DELETE FROM ideas WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Deleted",
      });
    }
  );
});

app.put("/ideas/:id", (req, res) => {
  const { title, description, status } = req.body;

  db.run(
    `UPDATE ideas
     SET title=?,description=?,status=?
     WHERE id=?`,
    [
      title,
      description,
      status,
      req.params.id,
    ],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Updated",
      });
    }
  );
});
app.patch("/ideas/:id/vote", (req, res) => {
  db.run(
    `
    UPDATE ideas
    SET votes = votes + 1
    WHERE id = ?
    `,
    [req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Vote Added",
      });
    }
  );
});
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}...`);
});