module.exports = function ( db ) {
  db = db || require('../../db.js');
 
  var entitlementSchema = db.Schema({
   
     itemId: {
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
     }
  });

  return entitlementSchema;
};
