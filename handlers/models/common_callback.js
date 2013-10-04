var callback = function(requestName, formatter, cb) {
  return {
    deliver: function (error, result) {
      if(error) {
        console.log('%s, Error: %s', requestName, JSON.stringify(error));
        cb(JSON.stringify(error));
      }
      else {
        cb(null, JSON.stringify(formatter(result)));
      }
    }
  };
};

module.exports = callback;