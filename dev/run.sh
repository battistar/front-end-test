#!/bin/sh

set -e

if [ "$1" = "start" ]; then
    docker compose build
    docker compose up
elif [ "$1" = "stop" ]; then
    docker compose down
else
    echo "Unknown command"
    echo ""
    echo "Usage: ./run.sh [start | stop]"
    echo ""
    echo "  - start: start server"
    echo "  - stop: teardown"
    exit 1
fi