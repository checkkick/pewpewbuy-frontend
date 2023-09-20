FROM node:18-alpine

WORKDIR /pewpewbuy-frontend
COPY . .

RUN npm i
RUN npm run build

ENTRYPOINT ["node", ".output/server/index.mjs"]
