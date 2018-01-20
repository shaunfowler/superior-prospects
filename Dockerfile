FROM node:8

WORKDIR /usr/app
COPY ./ /usr/app/

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin

RUN npm install
RUN npm install -g serve
RUN npm build

EXPOSE 3000
EXPOSE 35729

CMD ["npm", "run", "serve"]