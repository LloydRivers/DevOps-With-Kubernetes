const Hapi = require("@hapi/hapi");

let counter = 0;

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "0.0.0.0",
  });

  server.route({
    method: "GET",
    path: "/pingpong",
    handler: (request, h) => {
      counter++;
      return `pong ${counter}`;
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
