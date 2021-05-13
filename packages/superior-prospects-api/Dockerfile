FROM node:7.7.2-alpine

WORKDIR /usr/app

COPY ./ /usr/app/

RUN apk add --update git && \
	rm -rf /tmp/* /var/cache/apk/*

RUN yarn

EXPOSE 4000

CMD ["yarn", "start"]