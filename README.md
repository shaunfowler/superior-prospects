# Superior Prospects
The source for http://superiorprospects.com. The backend is a REST API running 
on Node, using Express and MongoDB. AngularJS powers the frontend.

## Install Dependencies

`npm install && bower install`

## Configure

Create a config file by running: `cp config.js.sample config.js`. 
Open `config.js` and set the hostname, email whitelist, and Google API creds.

Note: the `allowedEmailAddresses` property in `config.js` represents a user DB (could be stored in mongo).

## Run

`node server.js`  