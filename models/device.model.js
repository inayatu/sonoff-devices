const mongoose = require('mongoose');

const deviceSchema = mongoose.Schema({
  device: {
    type: Object,
  },
});

module.exports = Device = mongoose.model('Device', deviceSchema);
