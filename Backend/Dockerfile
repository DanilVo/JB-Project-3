FROM node:21.6.2-alpine3.19

RUN npm i -g nodemon

RUN npm i -g ts-node

WORKDIR /app

COPY package*.json /app

RUN npm i

COPY . /app

ENTRYPOINT npm start