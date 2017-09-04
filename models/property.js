var mongoose = require("mongoose");

var connProperties = mongoose.createConnection(
  "mongodb://sp_mongo:27017/properties"
);

var propertySchema = mongoose.Schema({
  _id: String,
  name: String,
  safeName: String,
  description: String,
  body: String,
  visible: Boolean,
  locationRefId: String,
  created: Date
});

module.exports = connProperties.model("Property", propertySchema);
