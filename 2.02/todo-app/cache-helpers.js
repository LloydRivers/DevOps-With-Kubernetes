const axios = require("axios");
const fs = require("fs");
const path = require("path");

const imageFilePath = path.join("/usr/src/app/files", "image.jpg");
const imageTimestampFilePath = path.join(
  "/usr/src/app/files",
  "image-timestamp.txt"
);

async function fetchAndSaveImage() {
  try {
    const response = await axios.get("https://picsum.photos/200", {
      responseType: "stream",
    });

    const writer = fs.createWriteStream(imageFilePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", () => {
        const timestamp = new Date().toISOString();
        fs.writeFileSync(imageTimestampFilePath, timestamp);
        resolve();
      });
      writer.on("error", reject);
    });
  } catch (error) {
    console.error("Error fetching and saving image:", error);
  }
}

function isImageCached() {
  if (fs.existsSync(imageFilePath) && fs.existsSync(imageTimestampFilePath)) {
    const timestamp = fs.readFileSync(imageTimestampFilePath, "utf8");

    const imageTime = new Date(timestamp);
    const currentTime = new Date();

    const diffInMinutes = (currentTime - imageTime) / (1000 * 60);

    return diffInMinutes < 60;
  }

  return false;
}

async function getImage() {
  if (isImageCached()) {
    console.log("Serving cached image");
    return fs.readFileSync(imageFilePath);
  } else {
    console.log("Fetching new image");
    await fetchAndSaveImage();
    return fs.readFileSync(imageFilePath);
  }
}

module.exports = {
  getImage,
  isImageCached,
};
