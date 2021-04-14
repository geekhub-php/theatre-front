#!/bin/bash

set -euo

DOMAIN_PROD="http://theatre-shevchenko.ck.ua"
DOMAIN_STAGING="http://develop.theatre.pp.ua"

BRANCH=$(echo ${GITHUB_REF#refs/heads/} | tr / -)
echo "BRANCH=$BRANCH" >> $GITHUB_ENV
echo "DOMAIN=${DOMAIN_STAGING}/${BRANCH}/en/" >> $GITHUB_ENV
echo "BASE_HREF=/${BRANCH}/" >> $GITHUB_ENV
echo "ENV=staging" >> $GITHUB_ENV
