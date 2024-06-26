const express = require("express");
const {
  readRequestCount,
  updateRequestCount,
  readTimestamp,
  generateHash,
} = require("./helpers");

const app = express();

app.get("/", (req, res) => {
  readRequestCount((err, requestCount) => {
    if (err) {
      res.status(500).send("Error reading request count");
      console.error("Error reading request count:", err);
      return;
    }

    requestCount += 1;

    updateRequestCount(requestCount, (err) => {
      if (err) {
        res.status(500).send("Error writing request count to file");
        console.error("Error writing request count to file:", err);
        return;
      }

      readTimestamp((err, timestampData) => {
        if (err) {
          res.status(500).send("Error reading timestamp file");
          console.error("Error reading timestamp file:", err);
          return;
        }

        const hash = generateHash(timestampData);
        res.send(
          `Timestamp: ${timestampData}<br>Request Count: ${requestCount}<br>Hash: ${hash}`
        );
      });
    });
  });
});

const PORT = 3000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Reader app listening on http://${HOST}:${PORT}`);
});
