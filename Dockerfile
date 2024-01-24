FROM node:latest

ENV TZ=Asia/Tokyo

WORKDIR /app
COPY . .

RUN npm install
