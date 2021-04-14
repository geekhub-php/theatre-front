#!/bin/bash

set -euo

ENV=$1

echo "action_state=yellow" >> $GITHUB_ENV
export $(xargs < .env)
export BRANCH="github-linter-2"
export DOMAIN="http://develop.theatre.pp.ua/github-linter-2/en/"
export BASE_HREF="/github-linter-2/"
