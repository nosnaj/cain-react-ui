#!/usr/bin/env bash

abort()
{
    echo "An error occurred. Exiting..." >&2
    exit 1
}

trap 'abort' 0

set -e

npm run smoke

trap : 0
