FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --non-interactive

COPY . .

RUN npm run build

ARG NUXT_API_BASE_URL

ENV NUXT_API_BASE_URL=${NUXT_API_BASE_URL}

EXPOSE 3000

CMD ["node", "/app/.output/server/index.mjs"]
