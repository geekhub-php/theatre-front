#!/bin/bash
set -euo

rm -rf dist

DOMAIN_PROD="http://theatre-shevchenko.ck.ua"
DOMAIN_STAGING="http://develop.theatre.pp.ua"
SSH_HOST="deploybot@104.248.253.61"

npm i
npm run lint
npm run lint-css
ng test --watch=false --browsers=ChromeHeadlessNoSandbox --code-coverage=true
ng e2e

if [ "$BRANCH" = "" ]; then BRANCH=$(git rev-parse --abbrev-ref HEAD); fi
if [ "$BRANCH" = "master" ]; then DOMAIN=$DOMAIN_PROD; else DOMAIN="$DOMAIN_STAGING/$BRANCH"; fi
if [ "$BRANCH" = "master" ]; then ENV="production"; else ENV="staging"; fi
if [ "$BRANCH" = "master" ]; then BASE_HREF="/"; else BASE_HREF="/$BRANCH/"; fi
ng build --configuration=${ENV}-uk \
  --deploy-url=$DOMAIN/uk/ \
  --base-href="$BASE_HREF"uk/ \
  --aot true --vendor-chunk true \
  --output-path 'dist/uk/' \
  --i18n-file src/assets/locale/locale.uk-ua.xlf \
  --i18n-format xlf \
  --i18n-locale uk-UA \
  --verbose \
  --i18n-missing-translation=error

ng build --configuration=${ENV}-en \
  --deploy-url=$DOMAIN/en/ \
  --base-href="$BASE_HREF"en/ \
  --aot true \
  --vendor-chunk true \
  --output-path "dist/en/"

cp ./deploy/branch.conf ./dist/
cp ./deploy/index.html ./dist/
cd dist/ && tar -zcvf ../dist.tar.gz * && cd -

ssh -i ./deploy/.ssh/staging $SSH_HOST "pwd"
scp -i ./deploy/.ssh/staging dist.tar.gz $SSH_HOST:~/theatre-front/$BRANCH.tar.gz
ssh $SSH_HOST "rm -rf ~/theatre-front/$BRANCH && mkdir ~/theatre-front/$BRANCH"
ssh $SSH_HOST "tar -xf ~/theatre-front/$BRANCH.tar.gz -C ~/theatre-front/$BRANCH"
ssh $SSH_HOST "sed -e 's/{{branch}}/$BRANCH/g' ~/theatre-front/$BRANCH/branch.conf > ~/nginxconf/$BRANCH.conf"

echo "Deployed to $DOMAIN"
