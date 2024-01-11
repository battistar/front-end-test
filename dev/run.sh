#!/bin/sh

set -e

if [ "$1" = "start" ]; then
    docker compose build
    docker compose up
elif [ "$1" = "stop" ]; then
    docker compose down
elif [ "$1" = "test" ]; then
    docker compose build
    docker compose run front-end-test npm run test
    docker compose down
else
    echo "Unknown command"
    echo ""
    echo "Usage: ./run.sh [start | stop]"
    echo ""
    echo "  - start: start server"
    echo "  - stop: teardown"
    echo "  - test: run tests"
    exit 1
fi