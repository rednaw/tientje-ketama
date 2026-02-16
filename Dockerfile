FROM node:20-alpine

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci 2>/dev/null || npm install
COPY . .
RUN npx prisma generate
RUN npm run build
RUN npm prune --omit=dev

COPY deploycontainer-entrypoint.sh /deploycontainer-entrypoint.sh
RUN chmod +x /deploycontainer-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/deploycontainer-entrypoint.sh"]
CMD ["node", "build"]
