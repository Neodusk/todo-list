#!/bin/bash
docker run --name todo_db -e MYSQL_ROOT_PASSWORD=d@t@ONE556 --network=todo_net -p 3306:3306 -d mariadb


#-e MYSQL_ROOT_PASSWORD=d@t@ONE556 


