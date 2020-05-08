const jwt = require('jsonwebtoken');

const generateJWT = (payload, secret) => jwt.sign(payload, secret);

const decodeJWT = (token, secret) => jwt.verify(token.split(' ')[1], secret);

module.exports = {
  generateJWT,
  decodeJWT,
};
