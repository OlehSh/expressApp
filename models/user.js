const mongoose = require('mongoose')
const {USER_ROLE} = require('../config/constants')
const bcrypt = require('bcrypt');
const createError = require('http-errors')

const Schema = mongoose.Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    dropDups: true,
    validator: (v) => {
      return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
    }
  },
  userRole: {
    type: Number,
    enum: Object.values(USER_ROLE),
    default: USER_ROLE.USER,
  },
  phone: {
    type: String,
    validate: {
      validator: (v) => {
        return /[+\d-]/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: false
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })

UserSchema.methods.validatePassword = async function (password) {
  try {
    let match = await bcrypt.compare(password, this.password)
    return match
  } catch (e) {
    throw createError(500, 'validatePassword Unhandled error')
  }
}

const User = mongoose.model('User', UserSchema)
module.exports = User
