const User = require('../models/user');
const createError = require('http-errors');
const bcrypt = require('bcrypt');

const createUser = async (body) => {
    const {
      firstName,
      lastName,
      email,
    } = body;
    let { password } = body;
    const salt = await bcrypt.genSalt(process.env.SALT_WORK_FACTOR);
    password = await bcrypt.hash(password, salt);
    const user = new User({
      firstName,
      lastName,
      email,
      password,
    })
    await user.save();
    const response =  user.toAuthJSON();
    return response;
}

module.exports = {
  createUser
}
