FROM node:7.7.2-alpine

WORKDIR /usr/app

COPY package.json .
COPY bower.json .
COPY gulpfile.js .

RUN apk add --update git && \
  rm -rf /tmp/* /var/cache/apk/*

RUN npm install --silent

RUN echo '{ "allow_root": true }' > /root/.bowerrc
RUN npm run bower-install

RUN npm run build

COPY ./ /usr/app/

CMD ["npm", "start"]