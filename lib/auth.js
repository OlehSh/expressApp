
const jwt = require('express-jwt');
const createError = require('http-errors');
const { decodeJWT } = require('./jwt');
const User = require('../models/user');

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;
  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
};
const checkUserExists = async (req, res, next) => {
  const { headers: { authorization } } = req;
  const userData = await decodeJWT(authorization, process.env.JWT_SECRET);
  const user = await User.findById(userData.id);
  if (!user) {
    return next(createError(401, 'User not found'));
  }
  req.userRole = user.userRole;
  next();
};
const auth = {
  required: jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
};

module.exports = {
  auth,
  checkUserExists,
};
