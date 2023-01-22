# Use an official Node.js runtime as the base image
FROM node:16

# Create a directory for the application
RUN mkdir -p /app

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port that the application will run on
#EXPOSE $PROT

# Start the application
CMD ["npm", "run", "build"]
CMD ["npm", "run", "start"]
