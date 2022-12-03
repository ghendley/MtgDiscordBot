FROM node:alpine

WORKDIR /usr/src/app

# INSTALL PACKAGES
COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .
