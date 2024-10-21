#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Function to display usage
usage() {
  echo "Usage: $0 -v <version>"
  exit 1
}

# Parse command line arguments
while getopts ":v:" opt; do
  case ${opt} in
    v )
      VERSION=$OPTARG
      ;;
    \? )
      usage
      ;;
  esac
done

# Check if version argument is provided
if [ -z "${VERSION}" ]; then
  usage
fi

# Docker username
DOCKER_USERNAME="himanshu806"

# Build Docker image
docker build -t ${DOCKER_USERNAME}/admin_nexus:${VERSION} -f ../Dockerfile .

# Push Docker image with version tag
docker push ${DOCKER_USERNAME}/admin_nexus:${VERSION}

# Tag the image as latest
docker tag ${DOCKER_USERNAME}/admin_nexus:${VERSION} ${DOCKER_USERNAME}/admin_nexus:latest

# Push the latest tag
docker push ${DOCKER_USERNAME}/admin_nexus:latest

echo "Docker images pushed successfully!"
