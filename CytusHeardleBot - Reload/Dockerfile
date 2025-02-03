# syntax = docker/dockerfile:1

# Specify Node.js version
ARG NODE_VERSION=18.18.2
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Set working directory
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Install dependencies required to build native modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential \
    python3 \
    python3-pip \
    python-is-python3 \
    g++ \
    make \
    libsqlite3-dev

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Set the command to start the bot
CMD ["node", "main.js"]