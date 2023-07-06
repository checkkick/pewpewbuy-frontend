FROM node:18-alpine

WORKDIR /pewpewbuy-frontend
COPY . .

RUN npm ci && npm cache clean --force
RUN npm run build

ENTRYPOINT ["node", ".output/server/index.mjs"]
