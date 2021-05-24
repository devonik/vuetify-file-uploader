# Base the image off of the NodeJS image
FROM node

# Set the working directory to be the HOME directory
WORKDIR /app

# Install NPM dependencies early in the build process
COPY ./package.json /app
COPY ./package-lock.json /app
RUN npm install

# Specify what port will be available - necessary for VPC network
EXPOSE 8080

# Start the container running our Node app
CMD ["npm", "run", "serve"]
