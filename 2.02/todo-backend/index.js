const express = require("express");
const app = express();
const cors = require("cors");
const port = 3002;

app.use(express.json());
app.use(cors());

// app.use((req, res, next) => {
//   res.locals.timestamp = "";
//   res.locals.requestCount = "";
//   res.locals.hash = "";
//   res.locals.imageData = "";
//   res.locals.todos = [];
//   next();
// });

let todos = ["Learn Node.js", "Learn Express.js", "Learn MongoDB"];

app.get("/todos", (req, res) => {
  console.log("Requesting todos from the backend service");
  res.status(200).json(todos);
});

app.post("/todos", (req, res) => {
  try {
    console.log("Adding a new todo to the backend service");

    // Log relevant request details for debugging
    console.log("Request headers:", req.headers);
    console.log("Content-Type header:", req.headers["content-type"]);
    console.log("req.body:", req.body); // Existing log

    const todo = req.body.todo;

    if (todo && todo.length > 0 && todo.length <= 140) {
      console.log("The array before the new todo is added", todos); // Existing log
      todos.push(todo);
      console.log(todos); // Existing log
      res.status(201).json({ message: "Todo added successfully" });
    } else {
      res.status(400).json({ message: "Invalid todo" });
    }
  } catch (error) {
    console.error("Error processing POST request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Todo backend listening at http://localhost:${port}`);
});
