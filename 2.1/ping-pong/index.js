const express = require("express");
const app = express();

let count = 0;
app.get("/pingpong", (req, res) => {
  count++;
  res.send(count.toString());
});
const PORT = 3001;
// const HOST = "0.0.0.0";

app.listen(PORT, () => {
  // console.log("Writer app listening on port 3001");
  console.log(`Writer app listening on port ${PORT}`);
});
