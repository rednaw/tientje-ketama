#!/usr/bin/env bash
set -e
[ ! -d /workspaces/tientje-ketama/node_modules ] && sudo mkdir -p /workspaces/tientje-ketama/node_modules || true
sudo chown -R node:node /workspaces/tientje-ketama/node_modules
exec "$@"
