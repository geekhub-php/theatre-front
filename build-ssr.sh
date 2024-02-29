#!/usr/bin/env bash

ENV=${1:-production}

set -e
set -o errexit

rm -rf dist
./node_modules/.bin/ng build -c "$ENV"-uk && ./node_modules/.bin/ng run theatre-front:server:"$ENV"-uk

mv dist/theatre-front/browser/uk dist/browser_uk
mv dist/theatre-front/server/uk dist/server_uk

./node_modules/.bin/ng build -c "$ENV"-en && ./node_modules/.bin/ng run theatre-front:server:"$ENV"-en

mv dist/browser_uk dist/theatre-front/browser/uk
mv dist/server_uk dist/theatre-front/server/uk
