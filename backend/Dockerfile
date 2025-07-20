# Stage 1
FROM node:latest AS builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY seed.js ./
RUN npm install

# Copy all source files
COPY . .
RUN npm run build

# Stage 2

FROM node:22-alpine AS runner

# Set the working directory
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm install --only=production

EXPOSE 8000

CMD ["node", "dist/index.js"]
