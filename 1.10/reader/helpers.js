const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

const timestampFilePath = path.join("/usr/src/app/files", "timestamp.txt");
const requestCountFilePath = path.join("/usr/src/app/files", "requests.txt");

function readRequestCount(callback) {
  if (!fs.existsSync(requestCountFilePath)) {
    fs.writeFileSync(requestCountFilePath, "0");
  }
  fs.readFile(requestCountFilePath, "utf8", (err, data) => {
    if (err) return callback(err);
    let count = 0;
    if (data) {
      count = parseInt(data, 10);
    }
    callback(null, count);
  });
}

function updateRequestCount(count, callback) {
  fs.writeFile(requestCountFilePath, count.toString(), callback);
}

function readTimestamp(callback) {
  fs.readFile(timestampFilePath, "utf8", callback);
}

function generateHash(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

module.exports = {
  readRequestCount,
  updateRequestCount,
  readTimestamp,
  generateHash,
};
