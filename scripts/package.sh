#!/usr/bin/env bash

ME=`basename "$0"`

abort()
{
  echo "An error occurred. Exiting..." >&2
  exit 1
}

usage()
{
  echo "Usage: $ME [build number] [environment] [logstash server]" >&2
  exit 1
}

trap 'abort' 0

set -e

BUILD_NUMBER=$1
if [ -z "$BUILD_NUMBER" ]; then usage; fi
ENV=$2
if [ -z "$ENV" ]; then usage; fi
LOGSTASH_SERVER=$3
if [ -z "$LOGSTASH_SERVER" ]; then usage; fi

rm -rf ./package/
cp -R ./config/. ./package
cd ./package/

if [ "$(uname)" == "Darwin" ]; then
  find . -type f -print0 | xargs -0 sed -i '' "s/__BUILD_NUMBER__/$BUILD_NUMBER/g"
  find . -type f -print0 | xargs -0 sed -i '' "s/__ENV__/$ENV/g"
  find . -type f -print0 | xargs -0 sed -i '' "s/__LOGSTASH_SERVER__/$LOGSTASH_SERVER/g"
else
  find . -type f -print0 | xargs -0 sed -i "s/__BUILD_NUMBER__/$BUILD_NUMBER/g"
  find . -type f -print0 | xargs -0 sed -i "s/__ENV__/$ENV/g"
  find . -type f -print0 | xargs -0 sed -i "s/__LOGSTASH_SERVER__/$LOGSTASH_SERVER/g"
fi

zip -r $BUILD_NUMBER.zip .

trap : 0