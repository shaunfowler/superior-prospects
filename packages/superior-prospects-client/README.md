# Superior Prospects

[![CircleCI](https://circleci.com/gh/shaunfowler/superior-prospects/tree/master.svg?style=svg)](https://circleci.com/gh/shaunfowler/superior-prospects/tree/master)

The source for http://superiorprospects.com.

> Note: This service is intended to be deployed in swarm. See the composition repo that contains the docker-compose file: https://github.com/shaunfowler/superior-prospects-composition

## Install Dependencies

`yarn`

## Build

`yarn build`

> To rebuild only the app image, run: `docker build -t shaunfowler/sp_client -f Dockerfile .`

## Run

`yarn start`

or

`docker run shaunfowler/sp_client`

Access the app at `http://localhost:3000`.
