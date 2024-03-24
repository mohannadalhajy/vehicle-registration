# Use Node 18 alpine as parent image
FROM node:18-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose port 3000 for the Node.js server
EXPOSE 3001

# Install MongoDB
RUN apt-get update && \
    apt-get install -y mongodb && \
    rm -rf /var/lib/apt/lists/*

# Create data directory for MongoDB
RUN mkdir -p /data/db

# Start MongoDB service
CMD mongod --bind_ip 0.0.0.0 & npm start
