const Hapi = require("@hapi/hapi");
const { v4: uuidv4 } = require("uuid");

let status = {
  timestamp: new Date().toISOString(),
  randomString: uuidv4(),
};

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "0.0.0.0",
  });

  setInterval(() => {
    status.timestamp = new Date().toISOString();
    status.randomString = uuidv4();
    console.log(
      `Timestamp: ${status.timestamp}, Random String: ${status.randomString}`
    );
  }, 5000);

  server.route({
    method: "GET",
    path: "/status",
    handler: (request, h) => {
      return status;
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
