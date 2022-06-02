FROM mariadb
ENV MYSQL_ROOT_PASSWORD="d@t@ONE556"
COPY source.sql .
#CMD mysql --password=${MYSQL_ROOT_PASSWORD} < "source.sql"
CMD ["mysql", "--password=${MYSQL_ROOT_PASSWORD}", "<", "source.sql"]
