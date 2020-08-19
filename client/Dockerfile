
FROM node:13.12.0-alpine

# set working directory
RUN mkdir -p /srv/app/client
WORKDIR /srv/app/client

# install app dependencies
COPY package.json /srv/app/client
COPY package-lock.json /srv/app/client
RUN npm install

# Copy local code into container
COPY . /srv/app/client

# start app
CMD ["npm", "start"]


