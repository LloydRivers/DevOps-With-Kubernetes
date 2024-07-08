const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = 3002;

app.use(express.json());
app.use(cors());
app.use(parseJsonBody);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

function parseJsonBody(req, res, next) {
  if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
    try {
      // Assuming the body is URL-encoded, parse it to JSON
      req.body = JSON.parse(JSON.stringify(req.body));
    } catch (error) {
      console.error("Error parsing URL-encoded body to JSON:", error);
      return res.status(400).json({ message: "Invalid request format" });
    }
  }
  next(); // Pass control to the next middleware or route handler
}

let todos = ["Learn Node.js", "Learn Express.js", "Learn MongoDB"];
// 8081 working
app.get("/todos", (req, res) => {
  console.log("Requesting todos from the backend service");
  res.status(200).json(todos);
});
// I have no ide why but the req.body = {} is not working, it is always empty
// 8081 => 80 => ingress => srrvice => pod
app.post("/todos", (req, res) => {
  console.log("/post route activated");
  try {
    console.log("Inside Try: Adding a new todo to the backend service");

    // Log relevant request details for debugging
    console.log("Request headers:", req.headers);
    console.log("Content-Type header:", req.headers["content-type"]);
    console.log("req.body:", req.body); // Existing log
    const todo = req.body.todo;

    if (todo && todo.length > 0 && todo.length <= 140) {
      console.log("Inside If: Adding a new todo to the backend service");
      console.log("The array before the new todo is added", todos); // Existing log
      todos.push(todo);
      console.log(todos); // Existing log
      res.status(201).json({ message: "Todo added successfully" });
    } else {
      console.log("Inside Else: Adding a new todo to the backend service");
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
