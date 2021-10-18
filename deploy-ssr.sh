#!/bin/bash
set -e
set -o errexit

rm -rf dist

DOMAIN_PROD="theatre-shevchenko.ck.ua"
DOMAIN_STAGING="staging.theatre.pp.ua"
BRANCH=$(git rev-parse --abbrev-ref HEAD)
SSH_HOST="geekhub-www"

#npm run lint
#npm run lint-css
#ng test --watch=false --browsers=ChromeHeadlessNoSandbox --code-coverage=true
#ng e2e

if [ "$BRANCH" = "master" ]; then DOMAIN=$DOMAIN_PROD; else DOMAIN="$DOMAIN_STAGING"; fi
if [ "$BRANCH" = "master" ]; then ENV="production"; else ENV="staging"; fi

./build-ssr.sh "$ENV"

cp ./deploy/branch.conf ./dist/
cp ./deploy/index.html ./dist/
cd dist/ && tar -zcvf ../dist.tar.gz * && cd -

scp dist.tar.gz $SSH_HOST:~/$DOMAIN.tar.gz
ssh $SSH_HOST "rm -rf ~/$DOMAIN && mkdir ~/$DOMAIN"
ssh $SSH_HOST "tar -xf ~/$DOMAIN.tar.gz -C ~/$DOMAIN"
ssh $SSH_HOST "mkdir ~/$DOMAIN/dist && mv ~/$DOMAIN/theatre-front ~/$DOMAIN/dist"
ssh $SSH_HOST "rm ~/$DOMAIN.tar.gz"

echo "Deployed to $DOMAIN"
