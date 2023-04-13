# Use Node.js version 14 as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container's working directory
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the files in the project to the container's working directory
COPY . .

# Build the React project inside the container
RUN npm run build

# Specify the command to run the React application when the container starts
CMD ["npm", "start"]
