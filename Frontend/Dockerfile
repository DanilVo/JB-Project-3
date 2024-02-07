FROM node:18-alpine3.19

WORKDIR /app

COPY package*.json /app

RUN npm i

COPY . /app

EXPOSE 5173

ENTRYPOINT npm run dev-exposed