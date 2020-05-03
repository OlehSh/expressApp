const jwt = require('jsonwebtoken')
const utils = require('util');

const verify = utils.promisify(jwt.verify);
const generateJWT = async (payload, secret) => {
  return jwt.sign(payload, secret)
}

const decodeJWT = (token, secret) => jwt.verify(token, secret);

module.exports = {
  generateJWT,
  decodeJWT,
}
