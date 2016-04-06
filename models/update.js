var mongoose = require('mongoose');

var connUpdates = mongoose.createConnection('mongodb://localhost/updates');

var updateSchema = mongoose.Schema({
    _id: String,
    body: String,
    created: Date
});

module.exports = connUpdates.model('Update', updateSchema);