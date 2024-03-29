#!/bin/bash

set -euo

rm -rf dist
TMPDIR=$(mktemp -d)

./node_modules/.bin/ng build --configuration="${ENV}-uk" \
  --deploy-url="${DOMAIN}uk/" \
  --base-href="${BASE_HREF}" \
  --aot true --vendor-chunk true \
  --output-path 'dist/' \
  --i18n-file src/assets/locale/locale.uk-ua.xlf \
  --i18n-format xlf \
  --i18n-locale uk-UA \
  --verbose \
  --i18n-missing-translation=error

mv ./dist/uk "${TMPDIR}/"

./node_modules/.bin/ng build --configuration="${ENV}-en" \
  --deploy-url="${DOMAIN}en/" \
  --base-href="${BASE_HREF}" \
  --aot true \
  --vendor-chunk true \
  --output-path "dist/"

mv "${TMPDIR}/uk" ./dist/
rm -rf "${TMPDIR}"


echo "Base href: ${BASE_HREF}"
echo "Domain: ${DOMAIN}"
echo "Environment: ${ENV}"
