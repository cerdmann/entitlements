var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  productId: {
   type: String,
   required: true,
   trim: true
  },
  title: {
   type: String,
   required: true,
   trim: true
  },
  description: {
   type: String,
   required: false,
   trim: true
  },
  totalNumberOfUses: {
   type: Number,
   required: true
  },
  timesUsed: {
   type: Number,
   required: true
  },
  expiration: {
   type: Date,
   required: true
  },
  expired: {
   type: Boolean,
   required: true
  },
  user: {
   type: String,
   required: true,
   trim: true
  },
});

module.exports = schema;