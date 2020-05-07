const userService = require('../servises/userServise');
const { decodeJWT } = require('../lib/jwt')
const getUsers = async (req, res, next) => {
  try {
    const users = await userService.findAllUsers();
    res.json(users);
  } catch (e) {
    next(e)
  }
}
const getUser = async (req, res, next) => {
  try {
    const {
      params: { id }
    } = req
    const users = await userService.getUserById(id);
    res.json(users);
  } catch (e) {
    next(e)
  }
}
const getProfile = async (req, res, next) => {
  try {
    const { headers: { authorization } } = req;
    const profile = decodeJWT(authorization, process.env.JWT_SECRET)
    const user = await userService.getUserById(profile.id)
    res.json(user);
  } catch (e) {
    next(e)
  }
}
const updateUser = async (req, res, next) => {
  try {
    const { params: {id}, body} = req
    const user = await userService.updateUser(id, body);
    return res.json(user);
    console.log('updateUser')
  } catch (e) {
    next(e)
  }
}
const deleteUser = async (req, res, next) => {
  try {
    const { params: {id}} = req
    await userService.deleteUserById(id);
    res.json('deleted');
  } catch (e) {
    next(e)
  }
}
const updateProfile = async (req, res, next) => {
  try {
    const { headers: { authorization }, body } = req;
    const profile = decodeJWT(authorization, process.env.JWT_SECRET);
    const user = await userService.updateUser(profile.id, body);
    return res.json(user);
  } catch (e) {
    next(e)
  }
}
const deleteProfile = async (req, res, next) => {
  try {
    const { headers: { authorization } } = req;
    const profile = decodeJWT(authorization, process.env.JWT_SECRET);
    await userService.deleteUserById(profile.id);
    res.json('deleted');
  } catch (e) {
    next(e)
  }
}
module.exports = {
  getUsers,
  deleteUser,
  updateUser,
  getUser,
  getProfile,
  updateProfile,
  deleteProfile
}
