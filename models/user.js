const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const { USER_ROLES } = require('../config/constants');

SALT_WORK_FACTOR = 5;

const UserSchema = new Schema({
  firstName:  {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email:   {
    type: String,
    required: true
  },
  userRole: {
    type: Number,
    enum: Object.values(USER_ROLES)
  },
  phone: {
    type: String,
    validate: {
      validator: (v) => {
        return /[+\d-]/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: false,
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

UserSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
const User = mongoose.model('User', UserSchema);
module.exports = User;
