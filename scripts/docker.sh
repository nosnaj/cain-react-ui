#!/usr/bin/env bash

ME=`basename "$0"`

abort()
{
  echo "An error occurred. Exiting..." >&2
  exit 1
}

usage()
{
  echo "Usage: $ME [build number] [docker image name]" >&2
  exit 1
}

trap 'abort' 0

set -e

BUILD_NUMBER=$1
if [ -z "$BUILD_NUMBER" ]; then usage; fi
DOCKER_IMAGE_NAME=$2
if [ -z "$DOCKER_IMAGE_NAME" ]; then usage; fi

DOCKER_REGISTRY=closertome

echo "Building $DOCKER_REGISTRY/$DOCKER_IMAGE_NAME:$BUILD_NUMBER"
docker build -t "$DOCKER_REGISTRY/$DOCKER_IMAGE_NAME:$BUILD_NUMBER" .
docker push "$DOCKER_REGISTRY/$DOCKER_IMAGE_NAME"

trap : 0
