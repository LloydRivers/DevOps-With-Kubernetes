## Delete the existing Cluster

Delete the existing Kubernetes cluster named `k3s-default`. Run the following command:

```bash
k3d cluster delete k3s-default
```

Next (IMPORTANT), create a new Kubernetes cluster called `k3s-default` or whatever you want if you havent deleted the default

with specific port mappings using k3d:

```bash
k3d cluster create k3s-default --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2
```

Here's an explanation of the port mappings:

- `8082:30080@agent:0`: Maps local port 8082 to port 30080 on `agent-0` within the cluster. This is where your express app will be accessible.
- `8081:80@loadbalancer`: Maps ports from the node containers (via the `serverlb`) to local port 8081. This is where the load balancer resides.

#### Your app: Access your app at http://localhost:8082

#### Load balancer: Access the load balancer at http://localhost:8081
