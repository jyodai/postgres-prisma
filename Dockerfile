FROM node:latest

ENV TZ=Asia/Tokyo

RUN npm install -g pnpm

WORKDIR /app
COPY . .

RUN pnpm install

RUN pnpm build

CMD ["pnpm", "start"]

