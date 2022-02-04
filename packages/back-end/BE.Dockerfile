FROM node:16

WORKDIR /usr/src

COPY . .

RUN yarn install

EXPOSE 8080

CMD [ "node", "server.js" ]