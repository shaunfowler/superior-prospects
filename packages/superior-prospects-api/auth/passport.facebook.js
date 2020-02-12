var passport = require("passport");
// var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;
var config = require("./config.facebook");
var UserModel = require("../schema/user");

var strategySettings = {
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL
};

console.log("Facebook", strategySettings);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport.use(
    new FacebookStrategy(
        strategySettings,
        (req, accessToken, refreshToken, profile, done) => {
            console.log("Validating user...", profile);

            // Build a user object from the facebook profile result.
            // This user object will be contained in the request context.
            var user = {
                id: profile.id,
                displayName: profile.displayName
            };

            UserModel.find({ email: user.id }, (error, users) => {
                if (error) {
                    console.log("Error looking up user", error);
                    done(null, false);
                    return;
                }

                if (users.length === 1 && users[0].email === user.id) {
                    console.info("Validated username and password");
                    done(null, user);
                } else {
                    console.info(`User not found by ID: ${user.id}`);
                    done(null, false);
                }
            });
        }
    )
);
