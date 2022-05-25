# Install dependencies only when needed
FROM --platform=linux/amd64 node:16.15.0-alpine AS deps
RUN apk update && apk add --no-cache libc6-compat && apk add git
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --immutable


# Rebuild the source code only when needed
FROM --platform=linux/amd64 node:16.15.0-alpine AS builder
# add environment variables to client code
ARG DATABASE_URL
ARG DISCORD_ID
ARG DISCORD_SECRET
ARG GITHUB_ID
ARG GITHUB_SECRET
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL

ENV DATABASE_URL=$DATABASE_URL
ENV DISCORD_ID=$DISCORD_ID
ENV DISCORD_SECRET=$DISCORD_SECRET
ENV GITHUB_ID=$GITHUB_ID
ENV GITHUB_SECRET=$GITHUB_SECRET
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXTAUTH_URL=$NEXTAUTH_URL

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
ARG NODE_ENV=production
RUN echo ${NODE_ENV}
# --ignore-englines
# yarn &&
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

USER nextjs

# Expose
EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED 1
CMD ["yarn", "start"]
