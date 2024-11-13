FROM node:22-alpine AS base
LABEL fly_launch_runtime="Node.js"
WORKDIR /usr/src/app

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# Install dependencies only when needed
FROM base AS deps

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
elif [ -f package-lock.json ]; then npm ci; \
elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
else echo "Lockfile not found." && exit 1; \
fi

# Rebuild the source code only when needed
FROM base AS builder

ENV NODE_ENV=production

COPY --from=deps /usr/src/app/node_modules ./node_modules

COPY . .

RUN \
if [ -f yarn.lock ]; then yarn run build; \
elif [ -f package-lock.json ]; then npm run build; \
elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
else echo "Lockfile not found." && exit 1; \
fi

# Final stage for app image
FROM base as runner

# Setting NODE_ENV=production requires secure cookie (https only access)
ENV PORT=9000
ENV HOST=0.0.0.0

# Copy config file
COPY ./medusa-config.ts ./
COPY ./tsconfig.json ./

# Copy built application
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/.medusa/server ./.medusa/server

# Run application
EXPOSE 9000

CMD ["npm", "run", "start"]


# docker build -t mudeusa2-marketplace .
# docker run --env-file .env mudeusa2-marketplace 