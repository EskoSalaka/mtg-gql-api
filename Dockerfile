FROM node:20-alpine as Build

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY package*.json ./
RUN npm ci

COPY --chown=node:node . .
RUN npm run build 


FROM node:20-alpine

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=Build --chown=node:node /home/node/dist/ ./dist/


CMD ["node", "dist/index.js"]