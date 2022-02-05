FROM node:16

WORKDIR /usr/src

RUN npm install --global pm2

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install

COPY ./ ./

EXPOSE 8080

CMD [ "pm2-runtime", "start", "server.js" ]