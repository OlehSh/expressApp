const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {USER_ROLE} = require('../config/constants')
const jwt = require('jsonwebtoken')

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
// @TODO remove JWT generation from model
UserSchema.methods.generateJWT = async () => {
  const today = new Date()
  const expirationDate = new Date(today)
  expirationDate.setDate(today.getDate() + 60)

  return jwt.sign({
    email: this.email,
    id: this._id,
    userRole: this.userRole,
    exp: parseInt(expirationDate.getTime() / 1000, 10)
  }, 'secret')
}

const User = mongoose.model('User', UserSchema)
module.exports = User
