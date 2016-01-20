#!/usr/bin/env bash

ME=`basename "$0"`

abort()
{
  echo "An error occurred. Exiting..." >&2
  exit 1
}

usage()
{
  echo "Usage: $ME [build number] [environment]" >&2
  exit 1
}

trap 'abort' 0

set -e

BUILD_NUMBER=$1
if [ -z "$BUILD_NUMBER" ]; then usage; fi
ENV=$2
if [ -z "$ENV" ]; then usage; fi

eb_deploy -p ./package/$BUILD_NUMBER.zip -e $ENV

trap : 0