# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency definitions
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci || npm install

# Copy the rest of the application code
COPY . .

# Build the Vite application for production
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy built static files and the server
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.js ./
COPY --from=build /app/package.json ./

# Install only production dependencies
RUN npm install express

# Expose port it listens on
EXPOSE 80

# Start the Node.js Server
CMD ["node", "server.js"]

