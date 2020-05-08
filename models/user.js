const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const { USER_ROLE } = require('../config/constants');

const { Schema } = mongoose;
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    dropDups: true,
    validator: (v) => /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v),
  },
  userRole: {
    type: Number,
    enum: Object.values(USER_ROLE),
    default: USER_ROLE.USER,
  },
  phone: {
    type: String,
    validate: {
      validator: (v) => /[+\d-]/.test(v),
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
  timestamps: true,
});

UserSchema.methods.validatePassword = async function (password) {
  try {
    const match = await bcrypt.compare(password, this.password);
    return match;
  } catch (e) {
    throw createError(500, 'validatePassword Unhandled error');
  }
};
UserSchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
