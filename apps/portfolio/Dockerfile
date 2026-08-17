# =========================
# Stage 1 - Build Astro
# =========================
FROM node:22-bookworm-slim AS build

WORKDIR /app

COPY apps/portfolio/package.json apps/portfolio/package-lock.json ./

RUN npm ci

COPY apps/portfolio ./

# Shared resume.json from monorepo root
COPY resume.json /resume.json

RUN npm run build


# =========================
# Stage 2 - Nginx
# =========================
FROM nginx:1.27-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY apps/portfolio/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]