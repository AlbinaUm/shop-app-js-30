FROM node:24.15.0-alpine AS build

WORKDIR /app
COPY package*.json ./

RUN --mount=type=cache,target=/root/.npm \
    npm install --prefer-offline --no-audit --no-fund

COPY . .

ENV NODE_OPTIONS="--max-old-space-size=1500"
RUN npx tsc --outDir dist

FROM node:24.15.0-alpine AS production

WORKDIR /app
COPY package*.json ./

RUN --mount=type=cache,target=/root/.npm \
    npm install --omit-dev --prefer-offline --no-audit --no-fund

COPY --from=build /app/dist ./dist

EXPOSE 8008

CMD ["node", "dist/index.js"]