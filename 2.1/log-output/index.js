const express = require("express");
const path = require("path");
const crypto = require("crypto");
const axios = require("axios");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, res) => {
  const timestamp = new Date().toISOString();

  const hash = crypto.createHash("sha256");
  hash.update(timestamp);

  const response = await axios.get("http://localhost:3001/pingpong");
  const requestCount = response.data;

  res.render("index", {
    timestamp,
    hash: hash.digest("hex"),
    requestCount,
  });
});

const PORT = 3000;
// const HOST = "0.0.0.0";

app.listen(PORT, () => {
  // console.log(`Reader app listening on http://${HOST}:${PORT}`);
  console.log(`Reader app listening on port ${PORT}`);
});
