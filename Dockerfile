# Build stage
FROM node:20-slim AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files and build the project
COPY . .
RUN npm run build

# Production stage
FROM node:20-slim

WORKDIR /app

# Copy package files and install ONLY production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy the built files from the builder stage
COPY --from=builder /app/dist ./dist
# Copy the server script
COPY server.js ./

# Expose port 8080 (Cloud Run default)
EXPOSE 8080

# Use process.env.PORT || 8080 in server.js
ENV PORT=8080

# Start the server
CMD ["npm", "start"]
