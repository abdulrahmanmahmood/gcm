FROM node:18-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

FROM base AS builder
RUN npm run build

FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/node_modules /app/node_modules
EXPOSE 3000
CMD ["npm", "run", "start"]