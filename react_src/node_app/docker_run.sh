#!/bin/bash
docker run --name todo_react --mount source='react-vol',target="/app" -it -p 3000:3000 -d todo_react
