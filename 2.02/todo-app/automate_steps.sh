#!/bin/bash

k3d cluster delete k3s-default

k3d cluster create k3s-default --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2

docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube

kubectl apply -f ./manifests
