#!/bin/bash

set -euo

DOMAIN_PROD="http://theatre-shevchenko.ck.ua"
DOMAIN_STAGING="http://develop.theatre.pp.ua"

echo "BRANCH=$(echo ${GITHUB_REF#refs/heads/} | tr / -)" >> $GITHUB_ENV
echo "DOMAIN=${DOMAIN_STAGING}/${env.BRANCH}/en/" >> $GITHUB_ENV
echo "BASE_HREF=/${env.BRANCH}/" >> $GITHUB_ENV
