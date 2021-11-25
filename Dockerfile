#### Stage 1: Build the base image
FROM node:13.12.0-alpine

# Add Maintainer Info
LABEL maintainer=nischala.moka@toyota.com

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

EXPOSE 3000

# start app
CMD ["npm", "start"]
