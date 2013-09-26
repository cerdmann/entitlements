var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  productId: {
   type: String,
   required: true,
   trim: true
  },
  name: {
   type: String,
   required: true,
   trim: true
  },
  description: {
   type: String,
   required: false,
   trim: true
  },
});

module.exports = schema;