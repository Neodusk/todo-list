#from node
FROM node:12
#create directory inside of container
WORKDIR /app
#copy local file src/package.json to created WORKDIR /app
#doing it this way is more efficient
COPY package.json .
#run npm install
RUN npm install
#copy all local files to /WORKDIR
COPY . .
#informs Docker that the container listens to port 8080 on runtime
#requires publishing of port to communicate with host (-p)
EXPOSE 8080

#can only have one CMD in a Dockerfile, provides the defaults for executing the program
CMD node server.js