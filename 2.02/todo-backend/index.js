const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let todos = [];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const todo = req.body.todo;
  if (todo && todo.length > 0 && todo.length <= 140) {
    todos.push(todo);
    res.status(201).json({ message: "Todo added successfully" });
  } else {
    res.status(400).json({ message: "Invalid todo" });
  }
});

app.listen(port, () => {
  console.log(`Todo backend listening at http://localhost:${port}`);
});
