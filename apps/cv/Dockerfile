# =========================
# Stage 1 - Build Astro
# =========================
FROM node:22-bookworm-slim AS build

WORKDIR /app

COPY apps/cv/package.json apps/cv/package-lock.json ./

RUN npm ci

COPY apps/cv ./

# Shared resume.json from monorepo root
COPY resume.json /resume.json

RUN npm run build


# =========================
# Stage 2 - Nginx
# =========================
FROM nginx:1.31.1-alpine AS runtime

COPY apps/cv/nginx/nginx.conf /etc/nginx/nginx.conf
COPY apps/cv/nginx/security-headers.conf /etc/nginx/security-headers.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]