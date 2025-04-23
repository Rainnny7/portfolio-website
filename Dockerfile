FROM imbios/bun-node AS base


# Install dependencies
FROM base AS depends
WORKDIR /usr/src/app
COPY package.json* bun.lock* ./
RUN bun install --frozen-lockfile --quiet


# Build the app
FROM base AS builder
WORKDIR /usr/src/app
COPY --from=depends /usr/src/app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1

RUN bun run build


# Run the app
FROM base AS runner
WORKDIR /usr/src/app

RUN addgroup --system --gid 1007 nextjs
RUN adduser --system --uid 1007 nextjs

# Create necessary directories and set permissions
RUN mkdir -p .next /tmp
RUN chown -R nextjs:nextjs /usr/src/app /tmp
RUN chmod -R 755 /usr/src/app /tmp

COPY --from=builder --chown=nextjs:nextjs /usr/src/app/.next ./.next
COPY --from=builder --chown=nextjs:nextjs /usr/src/app/next.config.ts ./next.config.ts
COPY --from=builder --chown=nextjs:nextjs /usr/src/app/tsconfig.json ./tsconfig.json
COPY --from=builder --chown=nextjs:nextjs /usr/src/app/src ./src
COPY --from=builder --chown=nextjs:nextjs /usr/src/app/public ./public
COPY --from=builder --chown=nextjs:nextjs /usr/src/app/package.json ./package.json

# Install dependencies including the correct version of chalk
RUN bun install --frozen-lockfile --quiet
RUN bun remove chalk && bun add chalk@4.1.2

ENV NODE_ENV=production

# Exposing on port 80 so we can
# access via a reverse proxy for Dokku
ENV HOSTNAME="0.0.0.0"
EXPOSE 80
ENV PORT=80

USER nextjs
CMD ["bun", "run", "start"]