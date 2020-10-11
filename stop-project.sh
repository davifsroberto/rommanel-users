#!/usr/bin/env bash
set -e
DOCKER_ROMMANEL_USERS="rommanel-users"
DOCKER_SSR_SERVER="ssr-server"
DOCKER_NETWORK="angular-ssr-network"

docker stop $DOCKER_ROMMANEL_USERS $DOCKER_SSR_SERVER
docker network rm $DOCKER_NETWORK
