#!/bin/bash
docker run --name todo_node --network="todo_net" -e PASS="d@t@ONE556" -e DBHOST="todo_db" -p 3030:8080 -d todo_node
