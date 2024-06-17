#!/bin/bash

VERCEL_ENV="staging"

echo Deploying to: $VERCEL_ENV

if [[ "$VERCEL_ENV" == "production" ]]; then
     echo "Build production"
  yarn build:prod
elif [[ "$VERCEL_ENV" == "staging" ]]; then
     echo "Build staging"
  yarn build:stg
else
     echo "Build development"
  yarn build:dev
fi
