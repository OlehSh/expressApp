const mongoose = require('mongoose')
const {USER_ROLE} = require('../config/constants')
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
}, {timestamps: true})


const User = mongoose.model('User', UserSchema)
module.exports = User
