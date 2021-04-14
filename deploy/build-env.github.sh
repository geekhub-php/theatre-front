#!/bin/bash

set -euo

ENV=$1

export $(xargs < .env)
export BRANCH="github-linter-2"
export DOMAIN="http://develop.theatre.pp.ua/github-linter-2/en/"
export BASE_HREF="/github-linter-2/"
