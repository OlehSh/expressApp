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
    console.log('SAVE')
    return user.save(function(err, savedUser) {
      console.log(err);
      if (err) {
        throw createError(422, err)
      }
      console.log(savedUser);
      return user.toAuthJSON();
    })
}

module.exports = {
  createUser
}
