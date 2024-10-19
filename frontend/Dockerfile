# Build stage
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy project files
COPY package.json package-lock.json ./
RUN npm install

# Copy rest of the files
COPY . .

# Build the React app
RUN npm run build

# Serve the app with Nginx
FROM nginx:1.25.4

# Copy build files to Nginx directory
COPY --from=build /app/build /usr/share/nginx/html
RUN chmod -R 755 /usr/share/nginx/html

# Copy custom Nginx configuration file
COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
