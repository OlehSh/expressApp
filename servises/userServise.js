const bcrypt = require('bcrypt');
const moment = require('moment');
const User = require('../models/user');
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
  });
  await user.save();
  const payload = {
    email: user.email,
    id: user._id,
    userRole: user.userRole,
    exp: parseInt(moment.utc().add(process.env.JWT_AUTH_TOKEN_EXPIRE_DAYS, 'days').format('X'), 10),
  };
  return { user: user.toObject(), token: await generateJWT(payload, process.env.JWT_SECRET) };
};
const findAllUsers = async () => {
  const users = await User.find();
  return Promise.all(users.map((user) => user.toObject()));
};
const getUserById = async (id) => {
  const user = await User.findById(id);
  return user.toObject();
};
const updateUser = async (_id, data) => {
  const user = await User.findOneAndUpdate({ _id }, { $set: data }, { new: true });
  return user.toObject();
};

const deleteUserById = (_id) => User.deleteOne({ _id });

module.exports = {
  createUser,
  findAllUsers,
  getUserById,
  updateUser,
  deleteUserById,
};
