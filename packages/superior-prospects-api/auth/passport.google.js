var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var config = require("./config.google");
var UserModel = require("../schema/user");

var strategySettings = {
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL
};

console.log("Google", strategySettings);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport.use(
    new GoogleStrategy(
        strategySettings,
        (req, accessToken, refreshToken, profile, done) => {
            console.log("Validating user...");

            // Build a user object from the google profile result.
            // This user object will be contained in the request context.
            var user = {
                id: profile.id,
                email: profile.emails[0].value,
                displayName: profile.displayName
            };

            UserModel.find({ email: user.email }, (error, users) => {
                if (error) {
                    console.log("Error looking up user", error);
                    done(null, false);
                    return;
                }

                if (users.length === 1 && users[0].email === user.email) {
                    console.info("Validated username and password");
                    done(null, user);
                } else {
                    console.info(`User not found by email: ${user.email}`);
                    done(null, false);
                }
            });
        }
    )
);
