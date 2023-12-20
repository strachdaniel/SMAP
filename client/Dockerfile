# Use Node.js 18 as the base image
FROM node:18-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

#Remove existing node_modules
RUN rm -rf node_modules

# Install dependencies using yarn

# Copy the entire project to the working directory
COPY . .

RUN yarn install

# Build the Next.js app for production
RUN yarn build

# Use Nginx as the production server
FROM nginx:alpine

# Copy the built static files from the previous stage to Nginx's web directory
COPY --from=builder /app/out /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
