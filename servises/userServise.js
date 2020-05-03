const User = require('../models/user');
const bcrypt = require('bcrypt');
const moment = require('moment');
const { generateJWT } = require('../lib/jwt');

const createUser = async (body) => {
    const {
      firstName,
      lastName,
      email,
    } = body;
    let { password } = body;
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_WORK_FACTOR, 10));
    password = await bcrypt.hash(password, salt);
    const user = new User({
      firstName,
      lastName,
      email,
      password,
    })
    await user.save();
    const payload = {
      email: user.email,
      id: user._id,
      userRole: user.userRole,
      exp: parseInt(moment.utc().add(process.env.JWT_AUTH_TOKEN_EXPIRE_DAYS, 'days').format('X'), 10)
    }
    return { user, token: generateJWT(payload, process.env.JWT_SECRET) };
}

module.exports = {
  createUser
}
