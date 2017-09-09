# Superior Prospects

[![CircleCI](https://circleci.com/gh/shaunfowler/superior-prospects/tree/master.svg?style=svg)](https://circleci.com/gh/shaunfowler/superior-prospects/tree/master)

[![Code Climate](https://codeclimate.com/github/shaunfowler/superior-prospects/badges/gpa.svg)](https://codeclimate.com/github/shaunfowler/superior-prospects)

The source for http://superiorprospects.com.

## Install Dependencies

`npm install && bower install`

## Configure

Create a config file by running: `cp config.js.sample config.js`.
Open `config.js` and set the hostname, email whitelist, and Google API creds.

Note: the `allowedEmailAddresses` property in `config.js` represents a user DB (could be stored in mongo).

## Build

`npm run build`

>To rebuild only the app image, run: `docker build -t superior_prospects  -f Dockerfile.app .`

## Run

`docker-compose up`

Access the app at `http://localhost:3000`.
