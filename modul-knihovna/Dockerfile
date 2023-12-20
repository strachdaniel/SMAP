# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock files into the container
COPY package*.json yarn.lock ./

# Install the application's dependencies
RUN yarn install

# Copy the rest of the application code into the container
COPY . .

# Expose port 3002 for the application to listen on
EXPOSE 3002

# Start the application with the yarn start command
CMD ["yarn", "start"]
