# ── Build stage ──────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

# Copy manifests for all workspaces so npm ci can resolve them
COPY package.json package-lock.json ./
COPY apps/api/package.json ./apps/api/

RUN npm ci --workspace @agritech/api --ignore-scripts

# Copy source + prisma schema
COPY apps/api/ ./apps/api/

# Generate Prisma client and compile TypeScript
RUN cd apps/api && npx prisma generate
RUN cd apps/api && npx tsc -p tsconfig.json

# ── Runtime stage ─────────────────────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Only production deps
COPY package.json package-lock.json ./
COPY apps/api/package.json ./apps/api/
RUN npm ci --workspace @agritech/api --omit=dev --ignore-scripts

# Copy compiled output + prisma artifacts
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/node_modules/.prisma ./apps/api/node_modules/.prisma
COPY apps/api/prisma ./apps/api/prisma

EXPOSE 4000

CMD ["node", "apps/api/dist/server.js"]
