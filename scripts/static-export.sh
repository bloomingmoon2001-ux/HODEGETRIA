#!/usr/bin/env bash
set -e

API_BAK=".bak-api"
DEMO_BAK=".bak-demo"

cleanup() {
  if [ -d "$API_BAK" ]; then
    mv "$API_BAK" "app/api"
    echo "Restored app/api"
  fi
  if [ -d "$DEMO_BAK" ]; then
    mv "$DEMO_BAK" "app/demo"
    echo "Restored app/demo"
  fi
}
trap cleanup EXIT

if [ -d "app/api" ]; then
  mv "app/api" "$API_BAK"
  echo "Moved app/api to $API_BAK"
fi

if [ -d "app/demo" ]; then
  mv "app/demo" "$DEMO_BAK"
  echo "Moved app/demo to $DEMO_BAK"
fi

cross-env OUTPUT_MODE=export next build