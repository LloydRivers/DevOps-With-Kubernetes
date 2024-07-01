const express = require("express");
const path = require("path");
const {
  readRequestCount,
  updateRequestCount,
  readTimestamp,
  generateHash,
} = require("./helpers");

const { getImage } = require("./cache-helpers");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, res) => {
  const data = await getImage();
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

        res.render("index", {
          timestamp: timestampData,
          requestCount: requestCount,
          hash: hash,
          imageData: data.toString("base64"),
        });
      });
    });
  });
});

const PORT = 3000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Reader app listening on http://${HOST}:${PORT}`);
});
