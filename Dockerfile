# Use the official Node.js LTS image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package files and install dependencies first (to leverage Docker cache)
COPY package*.json ./
RUN npm install --only=production

# Copy the rest of the application code (including app.js and wizexercise.txt)
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the Node.js application
CMD ["npm", "start"]
