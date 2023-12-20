# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package.json yarn.lock ./

# Install the application's dependencies
RUN yarn install

# Copy the rest of the application code into the container
COPY . .

RUN ls -la /app
# Expose port 3001 for the application to listen on
EXPOSE 3001

RUN yarn prisma generate

RUN yarn build

# Start the application with the npm start command
CMD ["yarn", "start"]
