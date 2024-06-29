const express = require("express");
const app = express();

let count = 0;
app.get("/pingpong", (req, res) => {
  count++;
  res.send(count.toString());
});
const PORT = 3001;
const HOST = "0.0.0.0";

app.listen(PORT, () => {
  console.log(`Ping-pong app listening on http://${HOST}:${PORT}`);
});
