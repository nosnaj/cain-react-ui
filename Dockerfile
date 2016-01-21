FROM mhart/alpine-node:5.4.1

# RUN npm install -g npm

RUN mkdir -p /var/app/current/dist
WORKDIR /var/app/current
COPY package.json /var/app/current/
COPY ./dist/ /var/app/current/dist/

RUN npm install --production

EXPOSE 9000

CMD node ./dist/server/server.js
