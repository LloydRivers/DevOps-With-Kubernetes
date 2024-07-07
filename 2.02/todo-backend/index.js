const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3002;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.locals.timestamp = "";
  res.locals.requestCount = "";
  res.locals.hash = "";
  res.locals.imageData = "";
  res.locals.todos = [];
  next();
});

let todos = ["Learn Node.js", "Learn Express.js", "Learn MongoDB"];

app.get("/todos", (req, res) => {
  console.log("Requesting todos from the backend service");
  res.status(200).json(todos);
});

app.post("/todos", (req, res) => {
  console.log("Adding a new todo to the backend service");
  console.log(req.body); // Logging the entire request body to inspect what is received I get an empty object
  console.log("Here is rthe full reuqest object", req); // Logging the entire request object to inspect what is received (I get a lot of information here)

  const todo = req.body.todo;

  if (todo && todo.length > 0 && todo.length <= 140) {
    todos.push(todo);
    console.log(todos); // Logging the todos array to inspect the new todo added
    res.status(201).json({ message: "Todo added successfully" });
  } else {
    res.status(400).json({ message: "Invalid todo" });
  }
});

app.listen(port, () => {
  console.log(`Todo backend listening at http://localhost:${port}`);
});
