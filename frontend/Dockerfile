# Stage 1: Build the Vite app
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY .env .env
RUN npm install
COPY . .
RUN npm run build
# Stage 2: Serve using Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
