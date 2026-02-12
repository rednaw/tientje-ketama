FROM node:20-alpine

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev 2>/dev/null || npm install --omit=dev
COPY . .
RUN npx prisma generate
RUN npm run build

COPY scripts/docker-entry.sh /docker-entry.sh
RUN chmod +x /docker-entry.sh

EXPOSE 3000
ENTRYPOINT ["/docker-entry.sh"]
