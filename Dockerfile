FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN --mount=type=cache,target=/root/.npm npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "/app/.output/server/index.mjs"]
