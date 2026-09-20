# ---- Etapa 1: build ----
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---- Etapa 2: servir con Caddy ----
FROM caddy:alpine
COPY --from=build /app/dist /usr/share/caddy
COPY Caddyfile /etc/caddy/Caddyfile
