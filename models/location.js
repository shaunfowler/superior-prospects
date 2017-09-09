var mongoose = require('mongoose');

var connLocations = mongoose.createConnection(
    'mongodb://sp_mongo:27017/locations'
);

var locationSchema = mongoose.Schema({
    _id: String,
    safeName: String,
    name: String,
    body: String
});

module.exports = connLocations.model('Location', locationSchema);
