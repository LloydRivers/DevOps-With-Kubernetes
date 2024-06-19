const Koa = require("koa");
const app = new Koa();

const PORT = process.env.PORT || 3000;

app.use(async (ctx) => {
  ctx.body = `Server started in port ${PORT}`;
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
