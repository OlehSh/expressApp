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
    unique: true,
    dropDups: true
  },
  userRole: {
    type: Number,
    enum: Object.values(USER_ROLE),
    defaultValue: USER_ROLE.USER
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

UserSchema.methods.generateJWT = async function() {
  console.log('generateJWT')
  console.log(this)
  const today = new Date()
  const expirationDate = new Date(today)
  expirationDate.setDate(today.getDate() + 60)

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10)
  }, 'secret')
}

UserSchema.methods.toAuthJSON = async function() {
  console.log('toAuthJSON')
  console.log(this);
  return {
    _id: this._id,
    email: this.email,
    token: await this.generateJWT()
  }
}
const User = mongoose.model('User', UserSchema)
module.exports = User
