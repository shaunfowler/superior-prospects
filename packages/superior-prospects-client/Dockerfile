FROM node:10

WORKDIR /usr/app
COPY ./ /usr/app/

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin

RUN yarn
RUN yarn build

EXPOSE 3000
EXPOSE 35729

CMD ["yarn", "serve"]