const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

const filePath = path.join("/usr/src/app/files", "timestamp.txt");

const writeTimestamp = () => {
  const timestamp = new Date().toISOString();

  fs.writeFile(filePath, timestamp, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Timestamp written to file");
    }
  });
};

setInterval(writeTimestamp, 5000);

app.listen(3000, () => {
  console.log("Writer app listening on port 3000");
});
