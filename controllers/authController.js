const { createUser } = require('../servises/authServise')

const signUp = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    return res.json({user});
  } catch (e) {
    next(e)
  }
}

const signIn = async (req, res, next) => {
  console.log('Sign in')
  res.json('Sign-in')
}

const signOut = async (req, res, next) => {
  console.log('sign Out')
  res.json('Sign-Out')
}
module.exports = {
  signIn,
  signOut,
  signUp
}
