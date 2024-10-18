# Use a node image as the base
FROM node:18-alpine AS build

# Set the working directory to /app
WORKDIR /app

# Copy the root package.json and package-lock.json
COPY package.json ./

# Copy client and server package.json and package-lock.json
COPY client/package.json ./client/
COPY server/package.json ./server/

# Install dependencies for both client and server
RUN npm install

# Copy the rest of the project files
COPY ./client ./client
COPY ./server ./server

# Build the client (frontend)
RUN npm run build --prefix client

# Start the server
CMD ["npm", "run", "start", "--prefix", "server"]

# Expose port 8000
EXPOSE 8000