const https = require("https");
const fs = require("fs");
const path = require("path");
const process = require("process");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const healthRoute = require("./routes/health");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const updatesRoute = require("./routes/updates");
const locationsRoute = require("./routes/locations");
const propertiesRoute = require("./routes/properties");
const mediaRoute = require("./routes/media");

// Warning message if auth is disabled
if (process.env.BYPASS_AUTH === "true") {
    console.log("\n\n*** RUNNING WITH AUTHENTICATION DISABLED ***\n\n");
}

// Setup auth strategy
require("./auth/passport.google");

// Connect to mongo
mongoose.Promise = global.Promise;
mongoose
    .connect("mongodb://localhost/sp")
    .then(() => console.log("Connection to MongoDB succesful"))
    .catch(err => {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    });

// Stack it upppp
const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(session({ secret: "1afcfdfb-94a1-5d57-f3c3-b07b1a530ddb" }));
app.use(passport.initialize());
app.use(passport.session());

// Serve the uplaods dir
app.use("/static", express.static(path.join(__dirname, "uploads")));
app.use("/", express.static(path.join(__dirname, "../web/build")));

// Express routes
app.use("/api/health", healthRoute);
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/updates", updatesRoute);
app.use("/api/locations", locationsRoute);
app.use("/api/properties", propertiesRoute);
app.use("/api/media", mediaRoute);


// Start express
// const port = process.env.PORT || 80;
// console.log("Starting service...");
// app.listen(port, () => {
//     console.log(`Listening on port ${port}`);
// });


const options = {
    key: fs.readFileSync("certs/server.key"),                  //Change Private Key Path here
    cert: fs.readFileSync("certs/server.crt"),            //Change Main Certificate Path here
    // ca: fs.readFileSync("certs/intermediate.crt"),             //Change Intermediate Certificate Path here
};
https.createServer(options, app)
    .listen(443, function (req, res) {                        //Change Port Number here (if required, 443 is the standard port for https)
        console.log("Server started at port 443");                //and here 
    });