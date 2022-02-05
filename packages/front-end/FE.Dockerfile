FROM node:16

WORKDIR /usr/src

RUN npm install --global pm2

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install

COPY ./ ./

RUN yarn run build

EXPOSE 3000

USER node

CMD [ "pm2-runtime", "start", "npm", "--", "start" ]