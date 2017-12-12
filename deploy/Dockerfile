# deploy/Dockerfile
# Dockerfile for your app.
# Change "budgeter" in the Dockerfile to your app's name
FROM node:argon
RUN apt-get install -y curl
RUN curl https://install.meteor.com/?release=1.4.2 | /bin/sh
# Change "budgeter" to your app's name
ADD . /opt/sociallyapp/app
# Install NPM packages
WORKDIR /opt/sociallyapp/app/programs/server
RUN npm install
# Set environment variables
WORKDIR /opt/sociallyapp/app
ENV PORT 80
ENV ROOT_URL http://127.0.0.1
#ENV MONGO_URL mongodb://mongo_instance:27017/sociallyapp
#ENV MONGO_URL 127.0.0.1:27017/sociallyapp

# Expose port 80
EXPOSE 80
# Start the app
CMD node ./main.js