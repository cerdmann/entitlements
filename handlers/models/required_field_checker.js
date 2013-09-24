var required_field_errors = {};
required_field_errors.message = 'Required field(s) missing';
required_field_errors.fields = [];

function check_fields(incoming_message, required_fields) {
  required_fields.forEach(function(fieldName) {
    if(incoming_message[fieldName] === undefined) {
        required_field_errors.fields.push(fieldName);
    }
  });
}

module.exports = {
  check: function(incoming_message, required_fields, error_cb, valid_cb) {

    check_fields(incoming_message, required_fields);

    if(required_field_errors.fields.length === 0) {
      valid_cb();
    }
    else {
      error_cb(JSON.stringify(required_field_errors));
    }
  }
};