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
FROM nginx:alpine

# Copy custom Nginx configuration to support SPA routing (React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static files from the build stage to Nginx's web root
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port it listens on
EXPOSE 80

# Start Nginx Server
CMD ["nginx", "-g", "daemon off;"]
