# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code into the container
COPY . .

# Generate Prisma Client
RUN yarn prisma generate

# Build the application
RUN yarn build

# Expose port 3003 for the application to listen on
EXPOSE 3003

# Start the application with the npm start command
CMD ["yarn", "dev"]