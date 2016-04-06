var mongoose = require('mongoose');

var connMedia = mongoose.createConnection('mongodb://localhost/media');

var mediaSchema = mongoose.Schema({
    _id: String,
    fileName: String,
    fileSize: String,
    propertyRefId: String,
    type: String,
    created: String
});

module.exports = connMedia.model('Media', mediaSchema);