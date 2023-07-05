FROM node:18-alpine

WORKDIR /app

ENV APP_ENV production

COPY . .

RUN npm ci
RUN npm run build

ENTRYPOINT [ "node", "/app/.output/server/index.mjs" ]
