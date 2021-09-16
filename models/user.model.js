const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  first_name: { type: String, required: [true, 'First name is must'] },
  last_name: { type: String },
  email: { type: String, unique: true, required: [true, 'Email is must'], select: true },
  password: { type: String, required: [true, 'Password is must'], select: true },
  phone: { type: String, select: true },
  bio: { type: String },
  app_id: { type: String },
  app_secret: { type: String },
  region: {
    type: String,
    required: [true, 'Region is must. e.g as, eu, us'],
    // enum: {
    //   values: ['as', 'us', 'eu'],
    //   message: 'Difficulty is either: easy, medium, difficult',
    // }
  },
  devices: [],
  ewelink: {},
  // devices: [
  //   {
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'Device',
  //   },
  // ],
  createdAt: { type: Date, default: Date.now(), select: false },
});

module.exports = User = mongoose.model('User', userSchema);
