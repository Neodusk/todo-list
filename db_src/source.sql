create database if not exists db1;
use db1;
CREATE TABLE if not exists todoList( listID int(10) NOT NULL AUTO_INCREMENT, listItem varchar(200) NOT NULL, done bool NOT NULL, PRIMARY KEY(listID));
