const { createUser } = require('../servises/userServise')

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

module.exports = {
  signIn,
  signUp
}
