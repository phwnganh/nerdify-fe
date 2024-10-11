# Build stage
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy project files
COPY package.json package-lock.json ./
RUN npm install

# Copy rest of the files
COPY . .

# Serve the app with json-server
CMD ["npx", "json-server", "--watch", "./src/database/db.json", "--port", "9999"]

# Expose port 9999
EXPOSE 9999
