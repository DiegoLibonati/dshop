#!/bin/bash

ROOT="$(dirname "$0")"

open_url() {
  case "$(uname -s)" in
    Linux*)  xdg-open "$1" ;;
    Darwin*) open "$1" ;;
    MINGW*|MSYS*|CYGWIN*) explorer.exe "$1" ;;
  esac
}

# Poll a URL until it answers with HTTP < 400, or give up after max_attempts.
wait_for() {
  local url="$1"
  local max_attempts="${2:-180}"   # 180 x 2s = 6 min, to absorb a cold `npm install`

  for ((i=1; i<=max_attempts; i++)); do
    if curl -sf -o /dev/null --max-time 2 "$url" 2>/dev/null; then
      return 0
    fi
    sleep 2
  done
  echo "start_dev: timed out waiting for $url" >&2
  return 1
}

# 1) shared-core comes up first — every other MFE federates from its remoteEntry.
cd "$ROOT/shared-core" && npm install && npm run dev &
wait_for "http://localhost:4000/remoteEntry.js"
open_url "http://localhost:4000"

# 2) shared-react + shared-angular start ONLY once shared-core's remote is live.
cd "$ROOT/shared-react" && npm install && npm run dev &
cd "$ROOT/shared-angular" && npm install && npm run dev &
wait_for "http://localhost:4010/remoteEntry.js"
open_url "http://localhost:4010"
wait_for "http://localhost:4020/remoteEntry.js"
open_url "http://localhost:4020"

# 3) host MFEs (product-detail + home) start ONLY once ALL shared remotes are live.
cd "$ROOT/product-detail" && npm install && npm run dev &
cd "$ROOT/home" && npm install && npm run dev &
wait_for "http://localhost:3020/"
open_url "http://localhost:3020"
wait_for "http://localhost:3010/"
open_url "http://localhost:3010"

# 4) container (host shell) starts ONLY once ALL remotes (shared + home + product-detail) are live.
cd "$ROOT/container" && npm install && npm run dev &
wait_for "http://localhost:3000/"
open_url "http://localhost:3000"

wait
