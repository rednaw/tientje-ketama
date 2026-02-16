#!/usr/bin/env bash
set -e
[ ! -d /workspace/node_modules ] && sudo mkdir -p /workspace/node_modules || true
sudo chown -R node:node /workspace/node_modules
exec "$@"
