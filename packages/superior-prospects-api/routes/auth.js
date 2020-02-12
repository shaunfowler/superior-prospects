var express = require("express");
var passport = require("passport");
var router = express.Router();

router.route("/facebook/callback").get(
    passport.authenticate("facebook", {
        successRedirect: "/",
        failure: "/?error=auth"
    })
);

router.route("/facebook").get(
    passport.authenticate("facebook", { 
        scope: ["email"]
    })
);

router.route("/logout").get((req, res) => {
    console.log("Logging out user -", JSON.stringify(req.user));
    req.logout();
    res.redirect("/?info=logged-out");
});

module.exports = router;
