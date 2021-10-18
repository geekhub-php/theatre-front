#!/bin/bash

export $(xargs < .env)

if [ "$BRANCH" = "master" ]; then DOMAIN=$DOMAIN_PROD; else DOMAIN="$DOMAIN_STAGING/$BRANCH"; fi
if [ "$BRANCH" = "master" ]; then ENV="production"; else ENV="staging"; fi
if [ "$BRANCH" = "master" ]; then BASE_HREF="/"; else BASE_HREF="/$BRANCH/"; fi

export $BRANCH
