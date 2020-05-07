const jwt = require('jsonwebtoken')

const generateJWT = async (payload, secret) => {
  return jwt.sign(payload, secret)
}

const decodeJWT = (token, secret) => {
  return jwt.verify(token.split(' ')[1], secret);
}

module.exports = {
  generateJWT,
  decodeJWT,
}
