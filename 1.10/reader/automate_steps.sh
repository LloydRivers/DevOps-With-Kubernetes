#!/bin/bash

k3d cluster delete k3s-default

k3d cluster create k3s-default --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2

docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube

if docker build -t lloydrivers052/reader-app:v1.0 . ; then
  docker push lloydrivers052/reader-app:v1.0

  kubectl apply -f ./manifests
else
  echo "Error: Docker build failed. Aborting script."
  exit 1
fi