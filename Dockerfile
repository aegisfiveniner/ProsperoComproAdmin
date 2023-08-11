# Use an official Node.js runtime as the base image
FROM node:14-alpine as build-stage

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm i

# Copy the source code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Use a lightweight server runtime as the base image
FROM nginx:alpine as production-stage

# Copy the build folder from the previous stage to the NGINX web root directory
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose the default port for NGINX
#EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
