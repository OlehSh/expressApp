const { createUser } = require('../servises/userServise')
const passport  = require('passport')
const { generateJWT } = require('../lib/jwt');
const moment  = require('moment');

const signUp = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    return res.json({user});
  } catch (e) {
    next(e)
  }
}

const signIn = async (req, res, next) => {
  try {
    await passport.authenticate('local-internal', async (err, user, info) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (info) {
        return res.status(401).json(info);
      }
      if (!user) {
        return res.status(404).json({ message: 'Something went wrong, please try again' });
      }
      const payload = {
        email: user.email,
        id: user._id,
        userRole: user.userRole,
        exp: parseInt(moment.utc().add(process.env.JWT_AUTH_TOKEN_EXPIRE_DAYS, 'days').format('X'), 10)
      }
      const token = await generateJWT(payload, process.env.JWT_SECRET);
      res.status(201).json({ token });
    })(req, res, next);
  } catch (e) {
    next(e)
  }
}

module.exports = {
  signIn,
  signUp
}
