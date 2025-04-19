#!/bin/zsh

if ! docker network inspect frontends >/dev/null 2>&1; then
  echo "Network 'frontends' does not exist. Creating..."
	docker network create frontends
else
	echo "Network 'frontends' already exists."
fi
