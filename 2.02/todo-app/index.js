const express = require("express");
const axios = require("axios");
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

/*
Here is what i think might happen: person open the browser on 8081 => 80(lb) => 3000 
Route hndler below activated.
It makes a request OUTSIDE the cluster "http://localhost:8081/todos"
Then ingress file is waiting for requests for /todos
*/
app.get("/", async (req, res) => {
  // const response = await axios.get("http://localhost:8081/todos");

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

app.get("/todos", async (req, res) => {
  try {
    const response = await axios.get("backend-svc:3002/todos");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Error fetching todos" });
  }
});

// app.post("/todos", async (req, res) => {
//   try {
//     const response = await axios.post(
//       "http://backend-svc:2345/todos",
//       req.body
//     );
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error creating todo:", error);
//     res.status(500).json({ error: "Error creating todo" });
//   }
// });

// I have a horrible feeling that we need the get todos and posts todos here. These hndlers call the backedj service.

const PORT = 3000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Reader app listening on http://${HOST}:${PORT}`);
});
