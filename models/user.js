'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.statics.register = function(userObj, cb) {
  // create a new user!
  this.create(userObj, cb);
};

var User = mongoose.model('User', userSchema);

module.exports = User;
