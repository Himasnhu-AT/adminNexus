#! /bin/bash

echo "Starting docker build and run..."
docker build -t admin_nexus .
docker run -d -p 8080:8080 admin_nexus
