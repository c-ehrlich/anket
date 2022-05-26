# Install dependencies only when needed
FROM --platform=linux/amd64 node:16.15.0-alpine AS deps
RUN apk update && apk add --no-cache libc6-compat && apk add git
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --immutable


# Rebuild the source code only when needed
FROM --platform=linux/amd64 node:16.15.0-alpine AS builder
# add args as environment variables
ARG NEXT_PUBLIC_DATABASE_URL
ARG NEXT_PUBLIC_DISCORD_ID
ARG NEXT_PUBLIC_DISCORD_SECRET
ARG NEXT_PUBLIC_GITHUB_ID
ARG NEXT_PUBLIC_GITHUB_SECRET
ARG NEXT_PUBLIC_NEXTAUTH_SECRET
ARG NEXT_PUBLIC_NEXTAUTH_URL

ENV NEXT_PUBLIC_DATABASE_URL=$NEXT_PUBLIC_DATABASE_URL
ENV NEXT_PUBLIC_DISCORD_ID=$NEXT_PUBLIC_DISCORD_ID
ENV NEXT_PUBLIC_DISCORD_SECRET=$NEXT_PUBLIC_DISCORD_SECRET
ENV NEXT_PUBLIC_GITHUB_ID=$NEXT_PUBLIC_GITHUB_ID
ENV NEXT_PUBLIC_GITHUB_SECRET=$NEXT_PUBLIC_GITHUB_SECRET
ENV NEXT_PUBLIC_NEXTAUTH_SECRET=$NEXT_PUBLIC_NEXTAUTH_SECRET
ENV NEXT_PUBLIC_NEXTAUTH_URL=$NEXT_PUBLIC_NEXTAUTH_URL

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
ARG NODE_ENV=production
RUN echo ${NODE_ENV}
RUN NODE_ENV=${NODE_ENV} yarn run prisma:generate
RUN NODE_ENV=${NODE_ENV} yarn build

# Production image, copy all the files and run as next
FROM --platform=linux/amd64 node:16.15.0-alpine AS runner
WORKDIR /app
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy needed files
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pages ./pages

# TEMP run prisma generate again
# RUN NODE_ENV=${NODE_ENV} yarn run prisma:generate

USER nextjs

# Expose
EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED 1
CMD ["yarn", "start"]
