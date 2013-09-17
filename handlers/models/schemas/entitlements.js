module.exports = function (db) {
 
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
     },
     user: {
       type: String,
       required: true,
       trim: true
     },
  });

  return entitlementSchema;
};
