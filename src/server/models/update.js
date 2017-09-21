var mongoose = require('mongoose');

var connUpdates = mongoose.createConnection('mongodb://sp_mongo:27017/updates');

var updateSchema = mongoose.Schema({
    _id: String,
    body: String,
    created: Date
});

module.exports = connUpdates.model('Update', updateSchema);
