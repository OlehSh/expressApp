const userService = require('../servises/userServise');

const getUsers = async (req, res, next) => {
  try {
    console.log('getUsers')
  } catch (e) {
    next(e)
  }
}
const getUser = async (req, res, next) => {
  try {
    console.log('getUser')
  } catch (e) {
    next(e)
  }
}
const updateUser = async (req, res, next) => {
  try {
    console.log('updateUser')
  } catch (e) {
    next(e)
  }
}
const deleteUser = async (req, res, next) => {
  try {
    console.log('deleteUser')
  } catch (e) {
    next(e)
  }
}
module.exports = {
  getUsers,
  deleteUser,
  updateUser,
  getUser
}
