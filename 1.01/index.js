const Koa = require("koa");
const app = new Koa();

const PORT = process.env.PORT || 3000;

/*
There might be another way to do this, but I had to

1. Start by finding the pod running your application:
   kubectl get pods -l app=<app-name>

2. Once you have the pod name, execute a shell session inside the pod:
   kubectl exec -it $(kubectl get pod -l app=<app-name> -o jsonpath="{.items[0].metadata.name}") -- /bin/sh

3. Inside the pod's shell, use curl to access your application:
   curl http://localhost:3000

   Then I saw the log coming out of the middleware.
*/

app.use(async (ctx) => {
  ctx.body = `Server started in port ${PORT}`;
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
