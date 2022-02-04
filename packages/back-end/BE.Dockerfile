FROM node:16

WORKDIR /usr/src

RUN yarn install

EXPOSE 8080

CMD [ "node", "server.js" ]