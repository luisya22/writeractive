FROM node:17-alpine AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:16-alpine AS builder

ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_AUTH_SERVER_URL
ARG NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_AUTH_SERVER_URL=$NEXT_PUBLIC_AUTH_SERVER_URL
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
#COPY --from=builder --chown=nextjs:nodejs /app/.next/server ./.next/server

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]