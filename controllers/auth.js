const requestHelper = require('../helper/requestHelper')

const signUp = async (req, res, next) => {
  console.log('Sign up');
  res.json('Sign-up');
}

const signIn = async (req, res, next) => {
  console.log('Sign in');
  res.json('Sign-in');
}

const signOut = async (req, res, next) => {
  console.log('sign Out');
  res.json('Sign-Out');
}
module.exports = {
  signIn,
  signOut,
  signUp
}
