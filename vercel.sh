#!/bin/bash

echo $VERCEL_ENV

if [[ $VERCEL_ENV == "production"  ]] ; then
 yarn build:prod
elif [[ $VERCEL_ENV == "staging"  ]] ; then
 yarn build:stg
else
 yarn build:dev
fi
