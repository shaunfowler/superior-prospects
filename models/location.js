var mongoose = require('mongoose');

var connLocations = mongoose.createConnection('mongodb://localhost/locations');

var locationSchema = mongoose.Schema({
    id: String,
    safeName: String,
    name: String,
    body: String
});

module.exports = connLocations.model('Location', locationSchema);