const fs = require("fs");
const process = require("process");

const clientID = fs.readFileSync("/Users/shaun/secrets/sp_client_id", "utf8").trim();
const clientSecret = fs
    .readFileSync("/Users/shaun/secrets/sp_client_secret", "utf8")
    .trim();

const apiHostname = process.env.API_BASE_URL || "https://local1.com";
const callbackURL = `${apiHostname}/api/auth/google/callback`;

module.exports = {
    clientID,
    clientSecret,
    callbackURL
};
