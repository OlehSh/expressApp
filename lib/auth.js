
const jwt = require('express-jwt');
const { decodeJWT } = require('../lib/jwt');
const User = require('../models/user');
const createError = require('http-errors');

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;
  if(authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  } else {
    return null;
  }
};
const checkUserExists = async (req, res, next) => {
  const { headers: { authorization } } = req;
  const token = authorization.split(' ')[1];
  const userData = decodeJWT(token, process.env.JWT_SECRET);
  const user = await User.findById(userData.id);
  if (!user) {
    return next(createError(401, 'User not found'))
  }
  req.userRole = user.userRole;
  next()
}
const auth = {
  required: jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
};

module.exports = {
  auth,
  checkUserExists
};
